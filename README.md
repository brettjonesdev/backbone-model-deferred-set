# backbone-model-deferred-set
Enhance `Backbone.Model` with a `deferredSet` method, which won't set the attribute until any outstanding `sync`s complete.

This can be a tricky issue when  UI allows the user to perform actions which set attributes on a model while it is in the middle of syncing.  This solution adds a `deferredSet` method which refrains from calling `set` until the response comes back and model is synced.  

If you want to see how it works in more detail, check out the [Spec file](test/ModelDeferredSetSpec.js).

### Contributing

You can run tests with `npm test`