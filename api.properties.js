var api = {
  server: 'https://www.google.com',
  versions: {
    v201403: {
      services: {
        Version: 'v201403',
        ActivityService: api.server + '/apis/ads/publisher/v201403/' + 'ActivityService?wsdl',
        ActivityGroupService: api.server + '/apis/ads/publisher/v201403/' + 'ActivityGroupService?wsdl',
        AdRuleService: api.server + '/apis/ads/publisher/v201403/' + 'AdRuleService?wsdl',
        AudienceSegmentService: api.server + '/apis/ads/publisher/v201403/' + 'AudienceSegmentService?wsdl',
        BaseRateService: api.server + '/apis/ads/publisher/v201403/' + 'BaseRateService?wsdl',
        CompanyService: api.server + '/apis/ads/publisher/v201403/' + 'CompanyService?wsdl',
        ContactService: api.server + '/apis/ads/publisher/v201403/' + 'ContactService?wsdl',
        ContentService: api.server + '/apis/ads/publisher/v201403/' + 'ContentService?wsdl',
        ContentBundleService: api.server + '/apis/ads/publisher/v201403/' + 'ContentBundleService?wsdl',
        ContentMetadataKeyHierarchyService: api.server + '/apis/ads/publisher/v201403/' + 'ContentMetadataKeyHierarchyService?wsdl',
        CreativeService: api.server + '/apis/ads/publisher/v201403/' + 'CreativeService?wsdl',
        CreativeSetService: api.server + '/apis/ads/publisher/v201403/' + 'CreativeSetService?wsdl',
        CreativeTemplateService: api.server + '/apis/ads/publisher/v201403/' + 'CreativeTemplateService?wsdl',
        CreativeWrapperService: api.server + '/apis/ads/publisher/v201403/' + 'CreativeWrapperService?wsdl',
        CustomFieldService: api.server + '/apis/ads/publisher/v201403/' + 'CustomFieldService?wsdl',
        CustomTargetingService: api.server + '/apis/ads/publisher/v201403/' + 'CustomTargetingService?wsdl',
        ExchangeRateService: api.server + '/apis/ads/publisher/v201403/' + 'ExchangeRateService?wsdl',
        ForecastService: api.server + '/apis/ads/publisher/v201403/' + 'ForecastService?wsdl',
        InventoryService: api.server + '/apis/ads/publisher/v201403/' + 'InventoryService?wsdl',
        LabelService: api.server + '/apis/ads/publisher/v201403/' + 'LabelService?wsdl',
        LineItemService: api.server + '/apis/ads/publisher/v201403/' + 'LineItemService?wsdl',
        LineItemCreativeAssociationService: api.server + '/apis/ads/publisher/v201403/' + 'LineItemCreativeAssociationService?wsdl',
        LineItemTemplateService: api.server + '/apis/ads/publisher/v201403/' + 'LineItemTemplateService?wsdl',
        LiveStreamEventService: api.server + '/apis/ads/publisher/v201403/' + 'LiveStreamEventService?wsdl',
        NetworkService: api.server + '/apis/ads/publisher/v201403/' + 'NetworkService?wsdl',
        OrderService: api.server + '/apis/ads/publisher/v201403/' + 'OrderService?wsdl',
        PlacementService: api.server + '/apis/ads/publisher/v201403/' + 'PlacementService?wsdl',
        ProductService: api.server + '/apis/ads/publisher/v201403/' + 'ProductService?wsdl',
        ProductTemplateService: api.server + '/apis/ads/publisher/v201403/' + 'ProductTemplateService?wsdl',
        ProposalService: api.server + '/apis/ads/publisher/v201403/' + 'ProposalService?wsdl',
        ProposalLineItemService: api.server + '/apis/ads/publisher/v201403/' + 'ProposalLineItemService?wsdl',
        PublisherQueryLanguageService: api.server + '/apis/ads/publisher/v201403/' + 'PublisherQueryLanguageService?wsdl',
        RateCardService: api.server + '/apis/ads/publisher/v201403/' + 'RateCardService?wsdl',
        RateCardCustomizationService: api.server + '/apis/ads/publisher/v201403/' + 'RateCardCustomizationService?wsdl',
        RateCardCustomizationGroupService: api.server + '/apis/ads/publisher/v201403/' + 'RateCardCustomizationGroupService?wsdl',
        ReconciliationOrderReportService: api.server + '/apis/ads/publisher/v201403/' + 'ReconciliationOrderReportService?wsdl',
        ReconciliationReportService: api.server + '/apis/ads/publisher/v201403/' + 'ReconciliationReportService?wsdl',
        ReconciliationReportRowService: api.server + '/apis/ads/publisher/v201403/' + 'ReconciliationReportRowService?wsdl',
        ReportService: api.server + '/apis/ads/publisher/v201403/' + 'ReportService?wsdl',
        SuggestedAdUnitService: api.server + '/apis/ads/publisher/v201403/' + 'SuggestedAdUnitService?wsdl',
        TeamService: api.server + '/apis/ads/publisher/v201403/' + 'TeamService?wsdl',
        UserService: api.server + '/apis/ads/publisher/v201403/' + 'UserService?wsdl',
        UserTeamAssociationService: api.server + '/apis/ads/publisher/v201403/' + 'UserTeamAssociationService?wsdl',
        WorkflowRequestService: api.server + '/apis/ads/publisher/v201403/' + 'WorkflowRequestService?wsdl'
      }
    }
  }
};

module.exports.services = api.versions.v201403.services;
