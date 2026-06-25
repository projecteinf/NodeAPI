# Protecció capçalera

Abans d'aplicar la protecció de la capçalera a la nostra aplicació, quan executem la comanda

```bash
curl -i http://localhost:3000/tracks
```

La informació que obtenim de la capçalera és:

```yaml
curl -i http://localhost:3000/tracks
HTTP/1.1 200 OK
X-Powered-By: Express
RateLimit-Policy: 100;w=900
RateLimit-Limit: 100
RateLimit-Remaining: 99
RateLimit-Reset: 900
Content-Type: application/json; charset=utf-8
Content-Length: 658
ETag: W/"292-fzZqAVod6i7nLX7j/s6ffIlSs0Y"
Date: Tue, 23 Jun 2026 16:36:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

Després de la protecció amb `Helmet`, les dades resultants són:

```yaml
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
RateLimit-Policy: 100;w=900
RateLimit-Limit: 100
RateLimit-Remaining: 99
RateLimit-Reset: 900
Content-Type: application/json; charset=utf-8
Content-Length: 658
ETag: W/"292-fzZqAVod6i7nLX7j/s6ffIlSs0Y"
Date: Tue, 23 Jun 2026 16:42:31 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
# Protecció atacs massius

```bash
for i in {1..101} 
  do 
    echo -e "\n\nEXECUCIÓ NÚMERO $i\n"
    curl http://localhost:3000/tracks | tail -n1 
done
```

```json

EXECUCIÓ NÚMERO 100

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   658  100   658    0     0   267k      0 --:--:-- --:--:-- --:--:--  321k
{
  "info": {},
  "data": [
    {
      "id": "FE3C4F2A-B094-4908-B4D8-AFD5C9989656",
      "title": "Billie Jean",
      "duration": 294
    },
    {
      "id": "887D5619-927A-4466-BFCF-DB97ABED62D1",
      "title": "Bohemian Rhapsody",
      "duration": 354
    },
    {
      "id": "229F0C58-8E69-451C-90A4-5546DCBF2CE3",
      "title": "Don't Stop Me Now Remastered",
      "duration": 294
    },
    {
      "id": "7C5E8FFF-1893-45FA-AA88-B84AA994B33E",
      "title": "Don't Stop Me Now Remastered 2026",
      "duration": 225
    },
    {
      "id": "0943DF7C-20CD-4AD4-9C37-D821B825D639",
      "title": "Get Lucky",
      "duration": 369
    },
    {
      "id": "50AD955C-DA0E-4BB5-A509-1B0EBC91F750",
      "title": "One More Time",
      "duration": 320
    },
    {
      "id": "30D1A058-992A-4FD1-9AAD-56F5AC0422D1",
      "title": "Smells Like Teen Spirit",
      "duration": 301
    }
  ]
}

EXECUCIÓ NÚMERO 101

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   149  100   149    0     0   144k      0 --:--:-- --:--:-- --:--:--  145k
{
  "status": 429,
  "error": "Too Many Requests",
  "message": "Has superat el límit de peticions permès. Si us plau, intenta-ho més tard en uns 15 minuts."
}
```