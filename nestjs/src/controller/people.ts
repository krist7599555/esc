import { Controller, Get, Param } from '@nestjs/common';
import { People, Person } from '../entity/person';
import { PersonSerializer } from '../serialize';
import { JwtPerson } from '../helper/id';

@Controller("/api/people")
// @UseInterceptors(ClassSerializerInterceptor)
export class PeopleController {
  @Get("/") 
  async index() {
    return People.run().then(persons => 
      PersonSerializer.serialize(persons)
    )
  }

  @Get("/me")
  showMe(@JwtPerson() me: Person) {
    return PersonSerializer.serialize(me)
  }

  @Get("/:personId")
  show(@Param('personId') personId: string) {
    return People.get(personId).run().then(data => 
      PersonSerializer.serialize(data)
    )
  }
}