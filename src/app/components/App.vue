<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Note Book 🧧</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5 col-sm-5">
          <div class="card">
            <div class="card-body">
              <form action="#" @submit.prevent="!edit ? addNote() : sendNote()">
                <div class="form-group">
                  <input
                    v-model="note.title"
                    type="text"
                    placeholder="Insert a name"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="">Description</label>
                  <textarea
                    v-model="note.description"
                    class="form-control"
                    rows="10"
                    cols="30"
                    placeholder="Insert a description"
                  ></textarea>
                </div>
                <template v-if="!edit">
                  <button class="btn btn-success btn-large ml-auto d-block">
                    Save
                  </button>
                </template>
                <template v-else>
                  <button class="btn btn-success btn-large ml-auto d-block">
                    Update
                  </button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7 col-sm-7">
          <table class="table table-bordered table-info text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Note</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(note, idx) in notes" :key="idx">
                <th>{{ idx + 1 }}</th>
                <td>{{ note.title }}</td>
                <td>{{ note.description }}</td>
                <td class="d-flex justify-content-center">
                  <button
                    @click="deleteNote(note._id)"
                    class="btn btn-sm btn-danger mr-2"
                  >
                    Del
                  </button>
                  <button
                    @click="editNote(note._id)"
                    class="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
class Note {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}
export default {
  name: 'App',
  data() {
    return {
      note: new Note(),
      notes: [],
      edit: false,
      noteToEdit: '',
    };
  },
  created() {
    this.getNotes();
  },
  methods: {
    addNote() {
      fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify(this.note),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => this.getNotes());
      this.note = new Note();
    },
    sendNote() {
      fetch('/api/notes/' + this.noteToEdit, {
        method: 'PUT',
        body: JSON.stringify(this.note),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.getNotes();
          this.edit = false;
        });
    },
    getNotes() {
      fetch('/api/notes')
        .then((res) => res.json())
        .then((data) => {
          this.notes = data;
          // console.log(this.notes);
        });
    },
    deleteNote(id) {
      fetch('/api/notes/' + id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => this.getNotes());
    },
    editNote(id) {
      fetch('/api/notes/' + id)
        .then((res) => res.json()) // with return
        .then((data) => {
          this.note = new Note(data.title, data.description);
          this.noteToEdit = data._id;
          this.edit = true;
        });
    },
  },
};
</script>
