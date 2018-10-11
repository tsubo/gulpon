---
layout: page.njk
title: Markdown Format
description: An example written by markdown.
---

# h1.Heading
## h2.Heading
### h3.Heading
#### h4.Heading
##### h5.Heading
###### h6.Heading

---

## Paragraph

Voluptate qui voluptate reprehenderit occaecat mollit laboris in est. Laboris ut amet occaecat et ipsum consequat reprehenderit do incididunt. Enim quis qui proident duis irure.

---

## List


* List1
* List2
* List3


1. List1
2. List2
3. List3

---

## Text Style

**Bold**

*Itaric*

---

## Blockquote

> Velit nisi consectetur magna magna amet minim elit aliqua elit voluptate proident. Aute quis in fugiat id in do ullamco in anim Lorem quis deserunt id. Et pariatur proident laboris culpa cillum eu et exercitation exercitation esse velit irure esse qui. Sunt laboris amet ex elit elit ut minim pariatur consequat aliqua aliqua id qui irure.

---

## Link

[Google.com](https://google.com)

---

## Image

![Image](https://picsum.photos/500/300/?random)

---

## Code

```js
// javascript
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);
```

---

## Table

| Left     | Center    | Right |
| -------- |:---------:| -----:|
| left1    | center1   | $1    |
| left22   | center22  | $22   |
| left333  | center333 | $333  |

<br>

<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

