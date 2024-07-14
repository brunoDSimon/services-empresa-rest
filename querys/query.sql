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

SELECT 
    SUM(pedido.valor * pedido.quantidade) AS valorTotal, 
    empresa.name,
    extract(month FROM pedido.createdAt) as mes
FROM 
    pedido 
INNER JOIN 
    empresa 
ON 
    pedido.empresaId = empresa.id
WHERE 
    pedido.createdAt BETWEEN '2024-01-01 00:00:00' AND '2024-12-31 23:59:59' 
    AND pedido.dataFinalizacao IS NULL 
GROUP BY 
    empresa.name, extract(month FROM pedido.createdAt) ;
    
    
    