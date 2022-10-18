Multi-Region PostgreSQL Database cluster **${settings.envName}** successfully installed.

Entry point details:
Use this for accessing the web admin panel of PostgreSQL master node
**Admin Panel**: [https://node${globals.master_id_sqldb-1}-${globals.domain}/](https://node${globals.master_id_sqldb-1}-${globals.domain}/)

You can connect to PostgreSQL cluster through the Pgpool-II leader node using the data below:    
Host: node${globals.master_id_pgpool-1}-${globals.pgpoolDomain}:5432

Database credentials:    
**User**: webadmin    
**Password**: ${globals.password}    

[Database Replication with PostgreSQL](https://docs.jelastic.com/postgresql-database-replication/)    
[Remote Access to PostgreSQL](https://docs.jelastic.com/remote-access-postgres/)    
[Import and Export Dump to PostgreSQL](https://docs.jelastic.com/dump-postgres/)    
