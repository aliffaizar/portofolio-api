import mongoose from 'mongoose';
import slugify from 'slugify';

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Projecttitle should not be empty!'],
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

projectSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
