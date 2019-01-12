//BACKBONE MODEL
var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
});

//BACKBONE COLLECTION
var Blogs = Backbone.Collection.extend({});

//INSTANTIATE TWO BLOGS
// var blog1 = new Blog({
//     author: 'mustafa',
//     title: 'mustafa\'s BLog',
//     url: 'http://mustafasblog.com'
// });
// var blog2 = new Blog({
//     author: 'rahuls',
//     title: 'rahul\'s BLog',
//     url: 'http://rahulsblog.com'
// });

//INSTANTIATE COLLECTION
var blogs = new Blogs();

//BACKBONE VIEW FOR ONE BLOG
var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('.blogs-list-template').html());
    },
    render: function() {
     this.$el.html(this.template(this.model.toJSON()));  
     return this; 
    }
});

//BACKBONE VIEW FOR ALL BLOGS
var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function() {
        this.model.on('add', this.render, this);
    },
    render: function() {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(blog) {
            self.$el.append((new BlogView({model: blog})).render().$el);
        });
        return this;
    }
});

var blogsView = new BlogsView();

$(document).ready(function () {
    $('.add-blog').on('click', function() {
        var blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val(),
        });
        $('.author-input').val('')
        $('.title-input').val('')
        $('.url-input').val('')
        blogs.add(blog);
     })
})
