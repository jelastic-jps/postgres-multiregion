var secondaryNodeId, secondaryNodeIp;
var resp = jelastic.env.control.GetEnvInfo('${@i}', session);
if (resp.result != 0) {
    return resp;
}
for (var i = 0, k = resp.nodes; i < k.length; i++) {
    if (k[i].nodeGroup == 'sqldb') {

        var addReplicaHostCmd = "jcm addReplicaHost " + k[i].address + " &>> /var/log/run.log; sudo jem service restart";
        resp = jelastic.env.control.ExecCmdByGroup('${env.envName}', session, "sqldb", toJSON([{
            "command": addReplicaHostCmd,
            "params": ""
        }]), false, false, "root");
        if (resp.result != 0) return resp;
        var updatePrimaryConnInfo = "jcm updatePrimaryConnInfo &>> /var/log/run.log; jcm updateHbaConf " + "${globals.pgsqlAddresses} " + k[i].address + " ; sudo jem service restart"
        resp = jelastic.env.control.ExecCmdByGroup('${@i}', session, "sqldb", toJSON([{
            "command": updatePrimaryConnInfo,
            "params": ""
        }]), false, false, "root");
        if (resp.result != 0) return resp;
    }
}

return {
    result: 0
}
