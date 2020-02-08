<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).

## Task
Язык –typescript

Фреймворк – NestJS

База – Mysql

Orm – typeorm


В таблице базы сохраняются благодарности полученные пользователями. Сервис получает from (string(16)) – id от кого получена благодарность (может быть null), to (string(16)) – кто получатель (всегда есть) и reason (string) – произвольная текстовая информация с деталями благодарности.


Для сохранения в таблице архитектор выбрал особую схему: primary key в таблице составной: вначале идёт id получателя, затем разделитель # и после этого порядковый номер с левым padding-ом до 6 знаков (например abcxyz0203040506#000004 – 4я благодарность полученная пользователем abcxyz0203040506). Остальные данные сохраняются как обычно в полях таблицы


Необходимо реализовать два эндпойнта: list и add.


List получает id пользователя-получателя и отдаёт список благодарностей от самых свежих к самым старым. Пагинация обеспечивается с помощью курсора: возможны два варианта параметров запроса:


?id=abcxyz0203040506&perPage=20 – запрашивает первую страницу результатов и определяет что каждая страница содержит 20 записей.


?cursor=oeufgwneiucgo2bitroibuwqnvqvowiytnqvoerym – запрашивает следующую страницу результатов по тем же параметрам.


Ответ в формате { total: 234, nextCursor: 'oeufgwneiucgo2bitroibuwqnvqvowiytnqvoerym', items: [ {from: '', reason: ''}, {from: '', reason: ''} ] }.


Если страница данных последняя, клиент получает ответ с nextCursor: null или вовсе без него.


Заранее известно что клиент разрабатывается junior-разработчиками. Если неправильно запрограммированный клиент пришлёт id и perPage вместе с cursor, они должны быть проигнорированы. Также cursor должен иметь формат, позволяющий включать его в url запроса без url-encoding-а – джуны постоянно забывают про encodeURIComponent. :)


Второй эндпойнт add получает POST с json-body вида { from: 'xxx', to: 'yyy', reason: 'blah' }, причём считается что from и to уже провалидированы на более высоком уровне и являются полностью валидными идентификаторами реально существующих в системе пользователей. From может быть null.


Add должен исключать возможность race condition при добавлении записей.


Остальные детали реализации – на совести разработчика. Желательно использовать где возможно стандартные средства фреймворка.
