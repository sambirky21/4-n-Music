const remoteURL = "http://localhost:5002";

export default Object.create(null, {
  get: {
    value: function(resource, id) {
      return fetch(`${remoteURL}/${resource}/${id}`).then(data => data.json());
    }
  },
  getAll: {
    value: function(resource) {
      // console.log(resource)
      return fetch(`${remoteURL}/${resource}`).then(data => data.json());
    }
  },

  getAllExpand: {
    value: function (resource, expandResource) {
        return fetch(`${remoteURL}/${resource}?_expand=${expandResource}&_sort=timeStamp`).then(data => data.json())
    }
  },

  delete: {
    value: function(resource, id) {
      console.log("id", id);
      return fetch(`${remoteURL}/${resource}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(e => e.json());
    }
  },

  post: {
    value: function(newObject, resource) {
      return fetch(`${remoteURL}/${resource}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newObject)
      }).then(data => data.json());
    }
  },

  put: {
    value: function(editedObject, resource) {
      return fetch(`${remoteURL}/${resource}/${editedObject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedObject)
      }).then(data => data.json());
    }
  }
});