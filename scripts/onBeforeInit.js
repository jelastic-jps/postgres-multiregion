var settings = jps.settings.main,
    MAX_COUNT = "environment.maxcount",
    SAME_NODES = "environment.maxsamenodescount",
    MAX_NODES = "environment.maxnodescount";

var min = 2, name, value,
    nodesMarkup = "Cannot create the multiregional cluster. Please check this quotas: ", nodesMarkupHidden = true;

var hasCollaboration = (parseInt('${fn.compareEngine(7.0)}', 10) >= 0),
    quotas = [];

if (hasCollaboration) {
    quotas = [
        { quota : { name: MAX_COUNT }, value: parseInt('${quota.environment.maxcount}', 10) },
        { quota : { name: MAX_NODES }, value: parseInt('${quota.environment.maxnodescount}', 10) },
        { quota : { name: SAME_NODES }, value: parseInt('${quota.environment.maxsamenodescount}', 10) }
    ];
    group = { groupType: '${account.groupType}' };
} else {
    quotas.push(jelastic.billing.account.GetQuotas(MAX_COUNT).array[0]);
    quotas.push(jelastic.billing.account.GetQuotas(SAME_NODES).array[0]);
    quotas.push(jelastic.billing.account.GetQuotas(MAX_NODES).array[0]);
    group = jelastic.billing.account.GetAccount(appid, session);
}

for (var i = 0, n = quotas.length; i < n; i++) {
  name = quotas[i].quota.name;
  value = quotas[i].value;
  if (value < min) { nodesMarkup = nodesMarkup + " " + name; nodesMarkupHidden = false; };
}

settings.fields.push({"type":"displayfield","cls":"warning","height":30,"hideLabel":true,"markup":nodesMarkup,"hidden":nodesMarkupHidden});

return {
    result: 0,
    settings: settings
};
