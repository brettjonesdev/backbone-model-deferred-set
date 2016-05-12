define(['backbone', 'json!test/testResponse.json', 'backbone-model-deferred-set'], function(Backbone, testResponse) {
    describe('Test Backbone.Model.deferredSet', function () {
        var Model, model;
        beforeEach(function () {
            Model = Backbone.Model.extend({
                url: 'test/testResponse.json'
            });
            model = new Model();
        });

        it('deferredSet method is present', function () {
            expect(model).toBeDefined();
            expect(typeof model.deferredSet).toEqual('function');
        });

        it('model.deferredSet sets immediately if not syncing', function () {
            var originalAttrs = {
                a: 1,
                b: 2
            };
            var expectedAttrs = {
                a: 1,
                b: 2,
                c: 3
            };
            model.deferredSet(originalAttrs);
            expect(model.toJSON()).toEqual(originalAttrs);
            model.deferredSet('c', 3);
            expect(model.toJSON()).toEqual(expectedAttrs);
        });

        it('model.deferredSet defers setting until after the model completes syncing', function (done) {
            expect(model.toJSON()).toEqual({});

            //Must GET not POST since connect doesn't allow POSTs, but both use `sync` so same principles apply
            var xhr = model.fetch();

            model.deferredSet({b: 3});

            //Does not set the attribute if we are syncing!
            expect(model.toJSON()).toEqual({});

            var expectedAttrsPostSyncAndSet = _.extend({}, testResponse, {
                b: 3
            });
            xhr.then(function() {
                expect(model.toJSON()).toEqual(expectedAttrsPostSyncAndSet);
                done();
            });
        });
    });
});

