import mongoose from 'mongoose';
import slugify from 'slugify';

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tag name should not be empty!'],
    },
    slug: String,
  },
  { timestamps: false, versionKey: false }
);

tagSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
