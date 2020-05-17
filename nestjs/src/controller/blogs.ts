import { Controller, Get, Param, Post, Body, Patch, NotFoundException } from '@nestjs/common';
import { r } from 'rethinkdb-ts'
import { JwtId } from '../helper/id';
import { Blogs } from '../entity/blog';
import { JsonApiSerialize } from '../serialize.interceptor';
import { IsString, IsNotEmpty } from 'class-validator';

class BlogDto {
  @IsString() 
  @IsNotEmpty() title: string;
  @IsString() 
  @IsNotEmpty() markdown: string;
}

@Controller("/api/blogs")
@JsonApiSerialize("blogs")
export class BlogsController {
  
  @Post("/")
  async create(
    @JwtId() author: string,
    @Body() blog: BlogDto
  ) {
    const wr = await Blogs
      .insert({
        ...blog,
        author,
        created: r.now().inTimezone('+07:00'),
        updated: r.now().inTimezone('+07:00'),
      })
      .run();
    return {
      id: wr.generated_keys[0]
    }
  }

  @Patch("/:blog_id")
  async update(
    @JwtId() author: string,
    @Param('blog_id') blog_id: string,
    @Body() blog: BlogDto
  ) {
      const wr = await Blogs
      .get(blog_id)
      .update({
        ...blog,
        updated: r.now().inTimezone('+07:00'),
      })
      .run();
      
      if (wr.skipped) {
        throw new NotFoundException("blog id is not exist");
      }
      return {
        id: wr.generated_keys[0]
      }
    }
    
    @Get("/")

    index() {
      return Blogs.orderBy('updated').run();
    }
    
    @Get("/:blog_id")

    async show(@Param('blog_id') blog_id: string) {
      const blog = await Blogs.get(blog_id).run();
      if (!blog) throw new NotFoundException("blog id is not exist");
      return blog;
    }

  
}