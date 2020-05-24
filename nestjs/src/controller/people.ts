import { Controller, Get, Param, Patch, Body, ForbiddenException } from '@nestjs/common';
import { People, Person } from '../entity/person';
import { JwtId } from '../helper/id';
import { JsonApiSerialize } from 'src/serialize.interceptor';

@Controller("/api/people")
@JsonApiSerialize("blogs")
export class PeopleController {
  @Get("/") 
  async index() {
    return People.run();
  }

  @Get("/:person_id")
  show(@Param('person_id') person_id: string) {
    return People.get(person_id).run();
  }

  @Patch("/:person_id")
  async patch(
    @JwtId() id: string,
    @Param('person_id') person_id: string,
    @Body() person: Partial<Person>
  ) {
    if (id != person_id) {
      throw new ForbiddenException("can not change other profile");
    }
    const fields: (keyof Person)[] = ["name_th", 'name_en', 'surname_th', 'surname_en', 'phone', 'department']
    const person_update = _.pick(person, fields);
    const wr = await People.get(id).update(person_update).run();
    return {
      data: { id },
      meta: {
        wr,
        person_update
      }
    }
  }
}