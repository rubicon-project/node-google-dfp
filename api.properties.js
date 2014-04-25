var api = {
  server: 'https://www.google.com',
  base_api_url: 'https://www.google.com/apis/ads/publisher',
  versions: {
    v201403: {
      services: {
        Version: 'v201403',
        ActivityService: api.base_api_url + '/v201403/' + 'ActivityService?wsdl',
        ActivityGroupService: api.base_api_url + '/v201403/' + 'ActivityGroupService?wsdl',
        AdRuleService: api.base_api_url + '/v201403/' + 'AdRuleService?wsdl',
        AudienceSegmentService: api.base_api_url + '/v201403/' + 'AudienceSegmentService?wsdl',
        BaseRateService: api.base_api_url + '/v201403/' + 'BaseRateService?wsdl',
        CompanyService: api.base_api_url + '/v201403/' + 'CompanyService?wsdl',
        ContactService: api.base_api_url + '/v201403/' + 'ContactService?wsdl',
        ContentService: api.base_api_url + '/v201403/' + 'ContentService?wsdl',
        ContentBundleService: api.base_api_url + '/v201403/' + 'ContentBundleService?wsdl',
        ContentMetadataKeyHierarchyService: api.base_api_url + '/v201403/' + 'ContentMetadataKeyHierarchyService?wsdl',
        CreativeService: api.base_api_url + '/v201403/' + 'CreativeService?wsdl',
        CreativeSetService: api.base_api_url + '/v201403/' + 'CreativeSetService?wsdl',
        CreativeTemplateService: api.base_api_url + '/v201403/' + 'CreativeTemplateService?wsdl',
        CreativeWrapperService: api.base_api_url + '/v201403/' + 'CreativeWrapperService?wsdl',
        CustomFieldService: api.base_api_url + '/v201403/' + 'CustomFieldService?wsdl',
        CustomTargetingService: api.base_api_url + '/v201403/' + 'CustomTargetingService?wsdl',
        ExchangeRateService: api.base_api_url + '/v201403/' + 'ExchangeRateService?wsdl',
        ForecastService: api.base_api_url + '/v201403/' + 'ForecastService?wsdl',
        InventoryService: api.base_api_url + '/v201403/' + 'InventoryService?wsdl',
        LabelService: api.base_api_url + '/v201403/' + 'LabelService?wsdl',
        LineItemService: api.base_api_url + '/v201403/' + 'LineItemService?wsdl',
        LineItemCreativeAssociationService: api.base_api_url + '/v201403/' + 'LineItemCreativeAssociationService?wsdl',
        LineItemTemplateService: api.base_api_url + '/v201403/' + 'LineItemTemplateService?wsdl',
        LiveStreamEventService: api.base_api_url + '/v201403/' + 'LiveStreamEventService?wsdl',
        NetworkService: api.base_api_url + '/v201403/' + 'NetworkService?wsdl',
        OrderService: api.base_api_url + '/v201403/' + 'OrderService?wsdl',
        PlacementService: api.base_api_url + '/v201403/' + 'PlacementService?wsdl',
        ProductService: api.base_api_url + '/v201403/' + 'ProductService?wsdl',
        ProductTemplateService: api.base_api_url + '/v201403/' + 'ProductTemplateService?wsdl',
        ProposalService: api.base_api_url + '/v201403/' + 'ProposalService?wsdl',
        ProposalLineItemService: api.base_api_url + '/v201403/' + 'ProposalLineItemService?wsdl',
        PublisherQueryLanguageService: api.base_api_url + '/v201403/' + 'PublisherQueryLanguageService?wsdl',
        RateCardService: api.base_api_url + '/v201403/' + 'RateCardService?wsdl',
        RateCardCustomizationService: api.base_api_url + '/v201403/' + 'RateCardCustomizationService?wsdl',
        RateCardCustomizationGroupService: api.base_api_url + '/v201403/' + 'RateCardCustomizationGroupService?wsdl',
        ReconciliationOrderReportService: api.base_api_url + '/v201403/' + 'ReconciliationOrderReportService?wsdl',
        ReconciliationReportService: api.base_api_url + '/v201403/' + 'ReconciliationReportService?wsdl',
        ReconciliationReportRowService: api.base_api_url + '/v201403/' + 'ReconciliationReportRowService?wsdl',
        ReportService: api.base_api_url + '/v201403/' + 'ReportService?wsdl',
        SuggestedAdUnitService: api.base_api_url + '/v201403/' + 'SuggestedAdUnitService?wsdl',
        TeamService: api.base_api_url + '/v201403/' + 'TeamService?wsdl',
        UserService: api.base_api_url + '/v201403/' + 'UserService?wsdl',
        UserTeamAssociationService: api.base_api_url + '/v201403/' + 'UserTeamAssociationService?wsdl',
        WorkflowRequestService: api.base_api_url + '/v201403/' + 'WorkflowRequestService?wsdl'
      }
    }
  }
};

module.exports.api = api;
module.exports.services = api.versions.v201403.services;
