import { Controller, Get, Param, UsePipes, ValidationPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { People } from '../entity/person';
import { PersonSerializer } from '../serialize';

@Controller("/api/people")
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({
  transform: true,
  skipMissingProperties: false,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  
}))
export class PeopleController {
  @Get("/") 
  async index() {
    return People.run().then(persons => {
      return PersonSerializer.serialize(persons)
    })
  }
  @Get("/:personId")
  show(@Param('personId') personId: string) {
    return People.get(personId).run()
  }
}