SELECT
  customers.customerId AS customerid,
  customers.name AS name,
  subjects.subjectName AS subjects
FROM
  customers
  JOIN subjects
  JOIN studentsubjectmapping
GROUP BY
  subjects
ORDER BY
  subjects.subjectName ASC