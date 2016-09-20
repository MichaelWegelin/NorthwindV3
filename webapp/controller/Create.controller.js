sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"de/wegelin/controller/BaseController"
], function(JSONModel, MessageBox, BaseController) {
	"use strict";

	return BaseController.extend("de.wegelin.controller.Create", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf de.wegelin.view.view.Create
		 */
		onInit: function() {
			this.getRouter().getRoute("create").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched: function() {
			var oNewSupplier = {
				Name: "",
				Address: {
					Street: "",
					City: "",
					State: "",
					Country: "",
					ZipCode: ""
				}
			};
			var oNewSupplierModel = new JSONModel(oNewSupplier);
			this.setModel(oNewSupplierModel,"newSupplier");
		},
		
		onSave: function() {
			var oNewSupplierModel = this.getModel("newSupplier");
			var oDataModel = this.getOwnerComponent().getModel();
			var oNewSupplier = oNewSupplierModel.getData();
			oDataModel.create("/Suppliers", oNewSupplier, {
				success: function() {
					MessageBox.success("New supplier has been saved.");
				},
				error: function(oError) {
					MessageBox.error(oError.message);
				}
			});
		},
		
		onCancel: function() {
			this.getRouter().navTo("master");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf de.wegelin.view.view.Create
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf de.wegelin.view.view.Create
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf de.wegelin.view.view.Create
		 */
		//	onExit: function() {
		//
		//	}

	});

});