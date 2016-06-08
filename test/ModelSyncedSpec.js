define(['backbone', 'json!test/testResponse.json', 'backbone-model-synced'], function(Backbone, testResponse) {
    describe('Test Backbone.Model.synced', function () {
        var Model, BadSyncModel, model, badModel;
        beforeEach(function () {
            Model = Backbone.Model.extend({
                url: 'test/testResponse.json'
            });
            BadSyncModel = Backbone.Model.extend({
                url: 'test/badUrl.json'
            });
            model = new Model();
            badModel = new BadSyncModel();
        });

        it('synced method is present', function () {
            expect(model).toBeDefined();
            expect(typeof model.synced).toEqual('function');
        });

        it('model.synced invokes callback immediately if not syncing', function () {
            var callback = jasmine.createSpy('callback');
            model.synced(callback);
            expect(callback).toHaveBeenCalled();
        });

        it('model.synced invokes callback only after the model completes syncing', function (done) {
            //Must GET not POST since connect doesn't allow POSTs, but both use `sync` so same principles apply
            var xhr = model.fetch();

            var callback = jasmine.createSpy('callback');
            model.synced(callback);
            expect(callback).not.toHaveBeenCalled();

            xhr.then(function() {
                expect(callback).toHaveBeenCalled();
                done();
            });
        });
        
        it('model.synced invokes callback even if model sync fails', function (done) {
            //Must GET not POST since connect doesn't allow POSTs, but both use `sync` so same principles apply
            var xhr = badModel.fetch();

            var callback = jasmine.createSpy('callback');
            badModel.synced(callback);
            expect(callback).not.toHaveBeenCalled();

            xhr.fail(function() {
                expect(callback).toHaveBeenCalled();
                done();
            });
        });
    });
});

