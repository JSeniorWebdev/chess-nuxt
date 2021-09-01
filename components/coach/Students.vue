<template>
  <div class="students">
    <div class="students__button">
      <Button
        :label="$t('invite_new_students')"
        type="tertiary"
        size="large"
        position="left"
        width="208px"
        height="40px"
        padding-top="10px"
        icon="add"
        @click="toInviteNewStudents"
      />
    </div>
    <div v-if="requests.count" class="students__item">
      <div class="students__header">
        <div class="students__title">
          {{ $t("new_requests") }} ({{ requests.count }})
        </div>
      </div>
      <div class="students__content">
        <RequestItem
          v-for="(request, i) in requests_result"
          :key="`request_${i}`"
          :request="request.user"
        />
      </div>
    </div>
    <div class="students__item">
      <div class="students__header">
        <div class="students__title">
          {{ $t("students") }}
          <span v-if="students.count">({{ students.count }})</span>
        </div>
      </div>
      <div v-if="students.count" class="students__content">
        <UserInfo
          v-for="(student, i) in students_result"
          :key="`student_${i}`"
          :user="student"
        />
      </div>
      <div v-else class="students__empty-container">
        <EmptyStudents />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";
import UserInfo from "~/components/coach/UserInfo";
import EmptyStudents from "~/components/coach/EmptyStudents";
import RequestItem from "~/components/coach/RequestItem";

export default {
  name: "Students",
  components: {
    Button,
    UserInfo,
    EmptyStudents,
    RequestItem,
  },
  data() {
    return {
      requests: {},
      students: {},
      students_result: [],
      requests_result: [],
      bottom: false,
      index: 0,
    };
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.addItem();
      }
    },
  },
  async mounted() {
    this.students = await this.$store.dispatch("coach/getStudents");
    this.requests = await this.$store.dispatch("coach/getCoachRequests");
  },
  async beforeMount() {
    this.requests = await this.$store.dispatch("coach/getCoachRequests");
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
      console.log(this.bottomVisible());
      this.addItem();
    });
  },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // },
  // created() {
  //   window.addEventListener("scroll", () => {
  //     this.bottom = this.bottomVisible();
  //   });
  //   this.addItem();
  // },
  methods: {
    toInviteNewStudents() {
      this.$router.push(`/coach/invite-students/`);
    },
    acceptRequest() {
      console.log("accept");
    },
    bottomVisible() {
      // const scrollY = window.scrollY;
      // const visible = document.documentElement.clientHeight;
      // const pageHeight = document.documentElement.scrollHeight;
      // const bottomOfPage = visible + scrollY >= pageHeight;
      // return bottomOfPage || pageHeight < visible;
      console.log(document.documentElement.scrollTop);
      console.log(window.innerHeight);
      console.log(document.documentElement.offsetHeight);
      const position = document.documentElement.scrollTop + window.innerHeight;
      return position === document.documentElement.offsetHeight;
    },
    addItem() {
      console.log(this.index);
      if (this.index < this.requests.count) {
        this.requests_result.push(this.requests.results[this.index]);
        console.log(this.requests_result, "this.requests_result");
        this.index++;
        if (this.bottomVisible()) {
          this.addItem();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/students";
</style>
