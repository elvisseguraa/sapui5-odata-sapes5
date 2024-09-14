sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  var _that;

  return Controller.extend("com.esegura.pe.demo.controller.Main", {
    onInit: function () {
      this.initialization();
    },

    initialization: function () {
      // this.listProducts();
      this.listCategories();
    },

    listCategories: function () {
      const oDataModel = this.getOwnerComponent().getModel("oDataSAPService");
      const oModelCategories = new sap.ui.model.json.JSONModel();
      const panelCategories = this.getView().byId("panelCategories");

      _that = this;

      oDataModel.read("/MainCategories", {
        success: function (oData, oResponse) {
          console.log("oData", oData);
          oModelCategories.setData(oData.results);

          panelCategories.setHeaderText(
            `${panelCategories.getHeaderText()} (${oData.results.length})`
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
      // const oItem = oEvent.getSource();

      const sPath = oEvent.getSource().getBindingContext("oDataCategories").getPath();
      // const selectedPath = JSON.stringify(oEvent.getSource().getBindingContext("mydata").getProperty(sPath));
      const selectedPath = oEvent
        .getSource()
        .getBindingContext("oDataCategories")
        .getProperty(sPath);

      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);

      oRouter.navTo("RouteDetail", {
        // detailPath: window.encodeURIComponent(oItem.getBindingContext("mydata").getPath().substr(1))
        detailPath: window.encodeURIComponent(JSON.stringify(selectedPath)),
      });
    },

  });
});
