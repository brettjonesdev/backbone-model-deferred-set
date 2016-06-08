# backbone-model-synced
Enhance `Backbone.Model` with a `synced` method, which accepts a callback which will be invoked immediately, unless the model is in the midst of syncing, in which case the callback will be called once the `sync` is complete.

This can be a tricky issue when  UI allows the user to perform actions which set attributes or perform other actions on a model while it is in the middle of syncing.  In the case where the UI tries to set a model attribute while the model sync is outstanding, the freshly-set attribute would get overwritten when the response comes back and the model syncs. With `backbone-model-synced`, you can instead do this:
   
```javascript
model.synced(function() {
   model.set('key', value);
});
```

If you want to see how it works in more detail, check out the [Spec file](test/ModelSyncedSetSpec.js).

### Contributing

You can run tests with `npm test`