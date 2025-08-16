sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("com.esegura.pe.demo.controller.Main", {
    onInit: function () {
      this.initialization();
    },

    initialization: function () {
      this.listCategories();
    },

    listCategories: function () {
      const oDataModel = this.getOwnerComponent().getModel("oDataSAPService");
      const oModelCategories = new sap.ui.model.json.JSONModel();
      const panelCategories = this.getView().byId("panelCategories");

      oDataModel.read("/MainCategories", {
        success: function (oData, oResponse) {
          console.log("oData", oData);
          oModelCategories.setData(oData.results);

          panelCategories.setHeaderText(
            `Categories (${oData.results.length})`
          );
        },
        error: function (oError) {
          console.log("oError", oError);
        },
      });

      this.getView().setModel(oModelCategories, "oDataCategories");
    },

    onGoToDetail: function (oEvent) {
      this.navigateToDetail(oEvent);
    },

    navigateToDetail: function (oEvent) {
      const oBindingContext = oEvent.getSource().getBindingContext("oDataCategories");
      const sPath = oBindingContext.getPath();
      const selectedPath = oBindingContext.getProperty(sPath);
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);

      oRouter.navTo("RouteDetail", {
        detailPath: window.encodeURIComponent(JSON.stringify(selectedPath)),
      });
    },

  });
});
