sap.ui.define([
	"sap/ui/test/Opa5",
	"de/wegelin/test/integration/pages/Common"
], function(Opa5, Common) {
	"use strict";

	Opa5.createPageObjects({
		onTheBrowserPage: {
			baseClass: Common,

			actions: {

				iChangeTheHashToObjectN: function(iObjIndex) {
					return this.waitFor(this.createAWaitForAnEntitySet({
						entitySet: "Objects",
						success: function(aEntitySet) {
							Opa5.getHashChanger().setHash("/Suppliers/" + aEntitySet[iObjIndex].ID);
						}
					}));
				},

				iChangeTheHashToTheRememberedItem: function() {
					return this.waitFor({
						success: function() {
							var sObjectId = this.getContext().currentListItem.getBindingContext().getProperty("ID");
							Opa5.getHashChanger().setHash("/Suppliers/" + sObjectId);
						}
					});
				},

				iChangeTheHashToTheRememberedId: function() {
					return this.waitFor({
						success: function() {
							var sObjectId = this.getContext().currentId;
							Opa5.getHashChanger().setHash("/Suppliers/" + sObjectId);
						}
					});
				},

				iChangeTheHashToSomethingInvalid: function() {
					return this.waitFor({
						success: function() {
							Opa5.getHashChanger().setHash("/somethingInvalid");
						}
					});
				}

			},

			assertions: {

				iShouldSeeTheHashForObjectN: function(iObjIndex) {
					return this.waitFor(this.createAWaitForAnEntitySet({
						entitySet: "Objects",
						success: function(aEntitySet) {
							var oHashChanger = Opa5.getHashChanger(),
								sHash = oHashChanger.getHash();
							QUnit.strictEqual(sHash, "Suppliers/" + aEntitySet[iObjIndex].ID, "The Hash is not correct");
						}
					}));
				},

				iShouldSeeTheHashForTheRememberedObject: function() {
					return this.waitFor({
						success: function() {
							var sObjectId = this.getContext().currentListItem.getBindingContext().getProperty("ID"),
								oHashChanger = Opa5.getHashChanger(),
								sHash = oHashChanger.getHash();
							QUnit.strictEqual(sHash, "Suppliers/" + sObjectId, "The Hash is not correct");
						}
					});
				},

				iShouldSeeAnEmptyHash: function() {
					return this.waitFor({
						success: function() {
							var oHashChanger = Opa5.getHashChanger(),
								sHash = oHashChanger.getHash();
							QUnit.strictEqual(sHash, "", "The Hash should be empty");
						},
						errorMessage: "The Hash is not Correct!"
					});
				}

			}

		}

	});

});