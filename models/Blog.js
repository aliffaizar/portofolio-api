import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title should not be empty!'],
      lowecase: true,
      unique: true,
    },
    slug: String,
    summary: String,
    body: String,
    image: String,
    tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

blogSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
