sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Element",
    "sap/m/MessageStrip",
  ],
  function (
    Controller,
    History,
    MessageToast,
    MessageBox,
    JSONModel,
    Element,
    MessageStrip
  ) {
    "use strict";

    return Controller.extend("com.esegura.pe.demo.controller.Detail", {
      onInit: function () {
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onObjectMatch, this);
      },

      _onObjectMatch: function (oEvent) {
        const record = JSON.parse(
          window.decodeURIComponent(oEvent.getParameter("arguments").detailPath)
        );
        console.log(record);

        this.listProducts(record.Id);
      },

      listProducts: function (sIdCategory) {
        const oDataModel = this.getOwnerComponent().getModel("oDataSAPService");
        const oModelProducts = new JSONModel();
        const panelProducts = this.getView().byId("panelProducts");

        const oFilter = new sap.ui.model.Filter(
          "MainCategoryId",
          sap.ui.model.FilterOperator.EQ,
          sIdCategory
        );

        oDataModel.read("/Products", {
          filters: [oFilter],
          success: function (oData, oResponse) {
            console.log("oData", oData);
            oModelProducts.setData(oData.results);

            panelProducts.setHeaderText(
              `Products (${oData.results.length})`
            );
          },
          error: function (oError) {
            console.log("oError", oError);
          },
        });

        this.getView().setModel(oModelProducts, "oDataProducts");
      },

      onNavBack: function () {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash != undefined) {
          window.history.go(-1);
        } else {
          const oRouter = UIComponent.getRouterFor(this);
          oRouter.navTo("RouteApp", {}, true);
        }
      },
    });
  }
);
