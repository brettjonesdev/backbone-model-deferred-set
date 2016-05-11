# backbone-model-deferred-set
Enhance `Backbone.Model` with a `deferredSet` method, which won't set the attribute until any outstanding `sync`s complete

If you want to see how it works in more detail, check out the [Spec file](test/ModelDeferredSetSpec.js).

### Contributing

You can run tests with `grunt test`