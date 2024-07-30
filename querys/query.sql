
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

CREATE USER 'dbproducao'@'%' IDENTIFIED BY 'testing@123';
GRANT ALL PRIVILEGES ON empresa.* TO 'dbproducao'@'%';
FLUSH PRIVILEGES;


create database empresa;

use empresa;
select * from auth;

 
select * from pedido order by pedido.createdAt;

#soma de valores totais
select sum(pedido.valor * pedido.quantidade) as valorTotal, sum(pedido.quantidade) as quantidade from pedido where pedido.createdAt BETWEEN '2024/07/01 00:00:00' and '2024/07/31 23:59:59' and pedido.dataFinalizacao IS NOT NULL;


#ver valores
SELECT pedido.valor, pedido.quantidade, empresa.name
FROM pedido
INNER JOIN empresa ON pedido.empresaId = empresa.id;


#valoresPorEmpresa 

SELECT 
    SUM(pedido.valor * pedido.quantidade) AS valorTotal, 
    empresa.name 
FROM 
    pedido 
INNER JOIN 
    empresa 
ON 
    pedido.empresaId = empresa.id
WHERE 
    pedido.createdAt BETWEEN '2024-07-01 00:00:00' AND '2024-07-31 23:59:59' 
    AND pedido.dataFinalizacao IS NULL 
GROUP BY 
    empresa.name;
    
#somar por mes de cada empresa

    
    
    