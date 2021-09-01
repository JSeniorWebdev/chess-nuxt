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
    if (query.test !== undefined) {
      await store.dispatch("tests/fetchQuestions", query.test);
    }
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
        onDrop: this.onDrop,
      },
      board: null,
      option: 0,
      nextIcon: "arrow-right-circle",
      optionName: "",
      clear: false,
      preventControl: false,
      step: 0,
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
    moduleName() {
      if (this.$route.name.includes("study")) return "study";
      else return "tests";
    },
  },
  mounted() {
    this.setBoard(this.currentQuestion.fenString);
    this.enableVirtualBoard();
    this.$store.commit("tests/startNewAnswer", this.getCurrentDateTime());
    this.getResultId();
  },
  beforeMount() {
    window.addEventListener("resize", this.myEventHandler);
  },
  created() {
    this.$store.commit("tests/clean");
  },
  methods: {
    nextStatus(option, nextIcon, optionName) {
      this.option = option;
      this.nextIcon = nextIcon;
      this.optionName = optionName;
      if (this.optionName === "move" || this.optionName === "moverequest") {
        if (this.option) this.preventControl = true;
        else {
          this.preventControl = false;
          this.config.position = this.currentQuestion.fenString;
          this.board = ChessBoard("board", this.config);
        }
      } else {
        this.preventControl = false;
        if (this.optionName === "fieldmarketing" && !this.option) {
          this.selectedFields = [];
        }
      }
    },
    setBoard(position) {
      this.config.position = position;
      this.config.draggable = this.isBoardDraggable();
      this.board = ChessBoard("board", this.config);
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
      let value;
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
    },
    onResizing() {
      // const board =
      ChessBoard("board", this.config);
      // window.addEventListener("resize", board.resize);
    },
    nextQuestion() {
      this.preventControl = false;
      this.step++;
      this.option = 0;
      this.nextIcon = "arrow-right-circle";
      this.clear = !this.clear;
      this.$store.commit("tests/finishAnswer", this.getCurrentDateTime());
      console.log(
        this.$store.state.tests.resultId,
        "this.$store.state.tests.resultId"
      );
      this.$store.dispatch("tests/sendAnswer", {
        testId: this.$store.state.tests.testId,
        questionId: this.currentQuestion.id,
        payload: {
          started_at: this.currentAnswer.startedAt,
          finished_at: this.currentAnswer.finishedAt,
          result_id: this.$store.state.tests.resultId,
          answer: {
            value: this.currentAnswer.value,
            move:
              this.currentAnswer.move !== ""
                ? this.currentAnswer.move
                : undefined,
          },
        },
      });
      this.$store.commit("tests/nextQuestion");
      this.setBoard(this.currentQuestion.fenString);
      this.$store.commit("tests/startNewAnswer", this.getCurrentDateTime());
      this.enableVirtualBoard();
    },
    finishTest() {
      this.$store.commit("tests/finishAnswer", this.getCurrentDateTime());
      this.$store.dispatch("tests/sendAnswer", {
        testId: this.$store.state.tests.testId,
        questionId: this.currentQuestion.id,
        payload: {
          started_at: this.currentAnswer.startedAt,
          finished_at: this.currentAnswer.finishedAt,
          result_id: this.$store.state.tests.resultId,
          answer: {
            value: this.currentAnswer.value,
            move:
              this.currentAnswer.move !== ""
                ? this.currentAnswer.move
                : undefined,
          },
        },
      });
      setTimeout(() => {
        this.$router.push(`/${this.moduleName}/result`);
        this.$store.commit("tests/cleanAnswers");
      }, 300);
    },
    previousQuestion() {
      this.step--;
      this.$store.commit("tests/previousQuestion");
      this.setBoard(this.currentQuestion.fenString);
      this.enableVirtualBoard();
    },
    async getResultId() {
      await this.$store.dispatch(
        "tests/finishTest",
        this.$store.state.tests.testId
      );
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
      if (this.selected(row, col)) {
        this.selectedFields = this.selectedFields.filter((f) => f !== field);
      } else {
        this.selectedFields.push(field);
      }
      this.$store.commit("tests/setAnswerValue", [...this.selectedFields]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/board";
</style>
