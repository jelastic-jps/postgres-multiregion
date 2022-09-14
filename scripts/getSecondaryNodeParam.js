var secondaryNodeId, secondaryNodeIp;
var resp = jelastic.env.control.GetEnvInfo('${@i}', session);
if (resp.result != 0) {
    return resp;
}
for (var i = 0, k = resp.nodes; i < k.length; i++) {
    if (k[i].nodeGroup == 'sqldb') {
        if (k[i].ismaster) {
            secondaryNodeId = k[i].id;
            secondaryNodeIp = k[i].address;
        }
    }
}
return {
    result: 0,
    "secondaryNodeIp": secondaryNodeIp,
    "secondaryNodeId": secondaryNodeId
}
