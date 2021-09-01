<template>
  <div class="board">
    <div class="board__title mobile">
      <div class="board__title__item">{{ currentQuestion.description }}</div>
    </div>
    <div class="board__containers">
      <div>
        <div class="board__container">
          <div id="board"></div>
          <div v-if="preventControl" class="prevent-control"></div>
          <div v-if="enabledVirtualBoard" class="virtual-board">
            <div
              v-for="row in rows"
              :key="`row_${row}`"
              class="virtual-board__row"
            >
              <div
                v-for="col in cols"
                :key="`row_${row}_col_${col}`"
                :class="{
                  'virtual-board__col': true,
                  'view-active': selected(row, col),
                }"
                @click="toggle(row, col)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="board__status">
      <InfoPanel
        :number="$store.state.tests.iterator + 1"
        :count="questions.length"
      />
      <Question
        :question="currentQuestion"
        :clear="clear"
        @next-status="nextStatus"
      />
      <ControlPanel
        :option="option"
        :next-icon="nextIcon"
        :option-name="optionName"
        :step="step"
        :last-question="isLastQuestionForButton"
        @previous-button-click="previousQuestion"
        @end-button-click="finishTest"
        @next-button-click="nextQuestion"
      />
    </div>
  </div>
</template>

<script>
// import VueDraggableResizable from "vue-draggable-resizable";
import Chess from "chess.js";
import Question from "~/components/tests/Question";
import ControlPanel from "~/components/tests/ControlPanel";
import InfoPanel from "~/components/tests/InfoPanel";

export default {
  name: "TestsBoard",
  components: {
    InfoPanel,
    // VueDraggableResizable,
    Question,
    ControlPanel,
  },
  async asyncData({ app, params, store, query }) {
    let resultId = null;
    if (query.test !== undefined) {
      await store.dispatch("tests/fetchQuestions", query.test);
      resultId = await store.dispatch("tests/startTest", {
        testId: query.test,
      });
    }
    return { resultId };
  },
  data() {
    return {
      enabledVirtualBoard: false,
      rows: ["a", "b", "c", "d", "e", "f", "g", "h"],
      cols: ["8", "7", "6", "5", "4", "3", "2", "1"],
      selectedFields: [],
      config: {
        draggable: true,
        position: "start",
        onDragStart: this.onDragStart,
        onSnapEnd: this.onSnapEnd,
        onDrop: this.onDrop,
        onMouseoutSquare: this.onMouseoutSquare,
        onMouseoverSquare: this.onMouseoverSquare,
      },
      board: null,
      game: null,
      resultId: null,
      option: 0,
      nextIcon: "arrow-right-circle",
      optionName: "",
      clear: false,
      preventControl: false,
      step: 0,
      selectedPosition: null,
      selectedPiece: null,
    };
  },
  computed: {
    questions() {
      return this.$store.state.tests.questions;
    },
    currentQuestion() {
      return this.$store.getters["tests/currentQuestion"];
    },
    currentAnswer() {
      return this.$store.getters["tests/currentAnswer"];
    },
    selected() {
      return (row, col) => {
        const field = `${row}${col}`;
        return this.selectedFields.includes(field);
      };
    },
    isLastQuestion() {
      return this.$store.getters["tests/isLastQuestion"];
    },
    isLastQuestionForButton() {
      return this.$store.getters["tests/isLastQuestionForButton"];
    },
  },
  mounted() {
    this.setBoard(this.currentQuestion.fenString);
    this.enableVirtualBoard();
    this.$store.commit("tests/startNewAnswer", this.getCurrentDateTime());
  },
  beforeMount() {
    window.addEventListener("resize", this.myEventHandler);
  },
  created() {
    this.$store.commit("tests/clean");
  },
  methods: {
    preventBehavior(e) {
      e.preventDefault();
    },
    onDragStart(source, piece, position, orientation) {
      // do not pick up pieces if the game is over
      console.log("this.game.game_over()", this.game.game_over());
      if (this.game.game_over()) return false;

      // only pick up pieces for the side to move
      if (
        (this.game.turn() === "w" && piece.search(/^b/) !== -1) ||
        (this.game.turn() === "b" && piece.search(/^w/) !== -1)
      ) {
        return false;
      }
      // if (this.selectedPosition === null) {
      //   this.selectedPosition = source;
      //   this.selectedPiece = piece;
      //   this.selectedFields = [];
      //   this.enabledVirtualBoard = true;
      // } else if (this.selectedPosition === position) {
      //   this.selectedPosition = null;
      // }
    },
    onSnapEnd() {
      this.board.position(this.game.fen());
    },
    removeGreySquares() {
      const items = document.querySelectorAll(".square-55d63");
      for (let i = 0; i < items.length; i++) {
        items[i].style.background = "";
      }
    },
    greySquare(square) {
      // const $square = $("#myBoard .square-" + square);
      const $square = document.querySelector(`.square-${square}`);

      let background = "#a9a9a9";
      if ($square.className.includes("black-3c85d")) {
        background = "#696969";
      }

      $square.style.background = background;
    },
    onMouseoverSquare(square, piece) {
      // get list of possible moves for this square
      const moves = this.game.moves({
        square,
        verbose: true,
      });

      // exit if there are no moves available for this square
      if (moves.length === 0) return;

      // highlight the square they moused over
      this.greySquare(square);

      // highlight the possible squares for this piece
      for (let i = 0; i < moves.length; i++) {
        this.greySquare(moves[i].to);
      }
    },
    onMouseoutSquare(square, piece) {
      this.removeGreySquares();
    },
    nextStatus(option, nextIcon, optionName) {
      console.log(option, nextIcon, optionName);
      this.option = option;
      this.nextIcon = nextIcon;
      this.optionName = optionName;
      if (this.optionName === "move") {
        if (this.option) {
          this.preventControl = true;
          this.removeGreySquares();
        } else {
          this.preventControl = false;
          console.log("B");
          this.config.position = this.currentQuestion.fenString;
          this.board = ChessBoard("board", this.config);
          this.game = Chess(this.config.position);
          document
            .getElementById("board")
            .addEventListener("touchmove", this.preventBehavior, {
              passive: false,
            });
        }
      } else {
        this.preventControl = false;
        console.log("C");
        if (this.optionName === "fieldmarketing" && !this.option) {
          this.selectedFields = [];
        }
      }
    },
    setBoard(position) {
      this.config.position = position;
      this.config.draggable = this.isBoardDraggable();
      this.board = ChessBoard("board", this.config);
      document
        .getElementById("board")
        .addEventListener("touchmove", this.preventBehavior, {
          passive: false,
        });
      this.game = Chess(position);
      window.addEventListener("resize", this.board.resize);
    },
    isBoardDraggable() {
      const type = this.currentQuestion.type;
      return (
        type !== "number" &&
        type !== "field_marking" &&
        type !== "multiple_choices" &&
        type !== "sorting"
      );
    },
    getCurrentDateTime() {
      return new Date().toISOString().substring(0, 19).replace("T", " ");
    },
    convertPiece(piece) {
      switch (piece[1]) {
        case "P":
          return "p"; // pěšák
        case "R":
          return "V"; // věž
        case "N":
          return "K"; // kůň
        case "B":
          return "S"; // střelec
        case "Q":
          return "D"; // dáma
        case "K":
          return "K"; // král
      }
    },
    getMove(piece, source, target) {
      const shortPiece = this.convertPiece(piece);
      return `${shortPiece}${source}-${target}`;
    },
    onDrop(source, target, piece, newPos, oldPos, orientation) {
      // see if the move is legal
      const move = this.game.move({
        from: source,
        to: target,
        promotion: "q", // NOTE: always promote to a queen for example simplicity
      });
      // illegal move
      let value;
      if (move !== null) {
        switch (this.currentQuestion.type) {
          case "correct_move":
            value = this.getMove(piece, source, target);
            this.$store.commit("tests/setAnswerValue", value);
            break;
          case "move_and_result":
            value = this.getMove(piece, source, target);
            this.$store.commit("tests/setAnswerMove", value);
            break;
        }
        return true;
      }
      return false;
    },
    async nextQuestion(doNext) {
      this.step++;
      this.option = 0;
      this.nextIcon = "arrow-right-circle";
      this.clear = !this.clear;
      await this.$store.commit("tests/finishAnswer", this.getCurrentDateTime());
      await this.$store.dispatch("tests/sendAnswer", {
        testId: this.$store.state.tests.testId,
        questionId: this.currentQuestion.id,
        payload: {
          started_at: this.currentAnswer.startedAt,
          finished_at: this.currentAnswer.finishedAt,
          result_id: this.resultId,
          answer: {
            value: this.currentAnswer.value,
            move:
              this.currentAnswer.move !== ""
                ? this.currentAnswer.move
                : undefined,
          },
        },
      });
      this.preventControl = false;
      console.log("D");
      if (doNext !== false) {
        if (this.isLastQuestion) {
          this.finishTest();
        } else {
          this.$store.commit("tests/nextQuestion");
          this.setBoard(this.currentQuestion.fenString);
          this.$store.commit("tests/startNewAnswer", this.getCurrentDateTime());
          this.enableVirtualBoard();
        }
      }
    },
    previousQuestion() {
      this.step--;
      this.$store.commit("tests/previousQuestion");
      this.setBoard(this.currentQuestion.fenString);
      this.enableVirtualBoard();
    },
    async finishTest() {
      await this.nextQuestion(false);
      setTimeout(() => {
        this.$router.push("/tests/result");
        this.$store.commit("tests/cleanAnswers");
      }, 300);
    },
    enableVirtualBoard() {
      this.enabledVirtualBoard = this.currentQuestion.type === "field_marking";
      if (this.enabledVirtualBoard) {
        this.selectedFields =
          this.currentAnswer.value !== "" ? [...this.currentAnswer.value] : [];
      }
    },
    toggle(row, col) {
      const field = `${row}${col}`;
      if (this.selectedPosition !== null) {
        if (this.onDrop(this.selectedPosition, field, this.selectedPiece)) {
          this.board.move(`${this.selectedPosition}-${field}`);
          this.enabledVirtualBoard = false;
          this.selectedPosition = null;
        }
      } else {
        if (this.selected(row, col)) {
          this.selectedFields = this.selectedFields.filter((f) => f !== field);
        } else {
          this.selectedFields.push(field);
        }
        this.$store.commit("tests/setAnswerValue", [...this.selectedFields]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/board";
</style>
