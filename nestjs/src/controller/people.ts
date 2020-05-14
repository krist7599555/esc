import { Controller, Get, Param } from '@nestjs/common';
import { People, Person } from '../entity/person';
import { JwtPerson } from '../helper/id';
import { serialize_people } from '../serialize';

@Controller("/api/people")
// @UseInterceptors(ClassSerializerInterceptor)
export class PeopleController {
  @Get("/") 
  async index() {
    return People.run().then(serialize_people)
  }

  @Get("/me")
  showMe(@JwtPerson() me: Person) {
    return serialize_people(me)
  }

  @Get("/:personId")
  show(@Param('personId') personId: string) {
    return People.get(personId).run().then(serialize_people)
  }
}