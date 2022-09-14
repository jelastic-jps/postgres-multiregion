var regions = '${settings.regions}'.split(','),
    onAfterReturn = {
        setGlobals: {}
    },
    glbs = onAfterReturn.setGlobals,
    pgsqlIPs = [];
    pgsqlEnvs = [];
for (var cluster = 1, n = regions.length + 1; cluster < n; cluster++) {
    var resp = jelastic.env.control.GetEnvInfo('${settings.mainEnvName}-' + cluster, session);
    if (resp.result != 0) {
        return resp;
    } else {
        pgsqlEnvs.push(resp.env.shortdomain);
    }
    for (var i = 0, k = resp.nodes; i < k.length; i++) {
        if (k[i].nodeGroup == 'sqldb') k[i].ismaster ? glbs["master_id_sqldb-" + cluster] = k[i].id : 0;
	pgsqlIPs.push(k[i].address);
    }
}
glbs["pgsqlAddresses"] = pgsqlIPs;
glbs["pgsqlEnvs"] = pgsqlEnvs;
return {
    result: 0,
    onAfterReturn: onAfterReturn
};
