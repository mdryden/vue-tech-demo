<template>
  <div>
    <section id="notes" v-if="!creating">
      <!-- Note :data-count - this is shorthand for v-bind:data-count -->
      <!-- Also note: noteCount and noteLabel are computed properties, so they are actually functions, but here
      they look the same as data properties -->
      <h1 :data-count="noteCount">{{ noteCount }} {{ noteLabel }}</h1>
      <p v-if="noteCount === 0">You have no notes</p>
      <!-- Note @click - this is shorthand for v-on:click -->
      <button @click="createNote()">New</button>
      <!-- v-for requires that you give it a key property (I think it can be an index) -->
      <!-- I believe it's used to keep track of when to update the DOM -->
      <article class="note" v-for="note in notes" :key="note.key">
        <h3>{{ note.title }}</h3>
        <strong>{{ formatDate(note.date) }}</strong>
        <p>{{ note.content }}</p>
        <button @click="deleteNote(note)">Delete note</button>
      </article>
    </section>

    <!-- a ref attribute allows vue to manipulate this element directly -->
    <form ref="createNoteForm" v-else @submit.prevent="saveNote()">
      <div>
        <input
          id="title"
          type="text"
          v-model="newNoteTitle"
          placeholder="Title"
          required
        />
      </div>
      <div>
        <textarea id="content" v-model="newNoteContent" required />
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" @click="cancelNote()">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  border-bottom: 1px solid black;
}

article {
  display: block;
  border-bottom: 1px solid black;
}

form input,
textarea {
  width: 20em;
  margin: 0.5em;
}

form button {
  margin: 0.5em;
}
</style>

<script>
import { database } from "../modules/firebase";

export default {
  name: "index",

  // props are immutable inputs for the component,
  props: {},

  // data is a method which returns an object that represents all two-way bound properties
  data() {
    return {
      notes: [],
      creating: false,
      newNoteTitle: null,
      newNoteContent: null,
    };
  },

  // computed is an object which holds has calculated readonly functions
  computed: {
    uid() {
      return this.$store.state.uid;
    },

    noteLabel() {
      return this.noteCount == 1 ? "note" : "notes";
    },

    noteCount() {
      return this.notes.length;
    },
  },

  // methods is an object which contains...methods
  methods: {
    formatDate(input) {
      let date = new Date(input);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },

    createNote() {
      this.creating = true;
    },

    async saveNote() {
      if (this.$refs.createNoteForm.checkValidity()) {
        let newKey = database.ref(`notes/${this.uid}`).push().key;
        let note = {
          key: newKey,
          title: this.newNoteTitle,
          content: this.newNoteContent,
          date: Date.now(),
        };

        await database.ref(`notes/${this.uid}/${newKey}`).set(note);
        this.clearNote();
        this.creating = false;
      } else {
        this.$refs.createNoteForm.reportValidity();
      }
    },

    clearNote() {
      this.newNoteTitle = null;
      this.newNoteContent = null;
    },

    cancelNote() {
      this.clearNote();
      this.creating = false;
    },

    async deleteNote(note) {
      let ref = database.ref(`notes/${this.uid}/${note.key}`);
      await ref.set(null);
    },
  },

  // this is an event called when the component is created
  created() {},

  // watch allows you to trigger events when props, data, or computed properties change
  watch: {
    // vue components are created asyncronously, so it's not certain whether we will
    // have access to the uid when the component is created, or slightly after
    // a watcher that fires once immediately allows you to "wait" until the value is ready
    uid: {
      immediate: true,
      handler(uid) {
        if (uid != null) {
          let ref = database.ref(`notes/${uid}`);
          this.$rtdbBind("notes", ref); // this is vuefire, doing a bunch of work for us.
        }
      },
    },
  },
};
</script>
