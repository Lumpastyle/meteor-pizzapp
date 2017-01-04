import { Session } from 'meteor/session';

Session.set( "pizza_id", "0" );


FlowRouter.route('/', {
    name : "home",
    action : function (params) {
        BlazeLayout.render('pizza_view', {main: ''})
    }
});

FlowRouter.route('/pizza/:_id', {
    name : 'edit',
    action : function (params) {
        BlazeLayout.render('edit_pizza', {main: ''})
        Session.set( "pizza_id", params._id )
    }
});

Template.edit_pizza.helpers ({
    pizza: function () {
        var pizza_id = Session.get( "pizza_id" );
        return pizza.findOne({_id : pizza_id});
    }
});

Template.pizza_view.helpers
( {
    all_pizzas : function ()
    {
        return pizza.find();
    }
} );

Template.edit_pizza.events ({
   'click .home-btn' : function ( event, template ) {
       event.preventDefault();
       FlowRouter.go('/');
   },
   'click .send-btn' : function ( event, template ) {
       event.preventDefault();

       var pizza_id = Session.get( "pizza_id" );

       var $name = template.find( "#name" );
       var $src = template.find( "#src" );
       var $ingredients = template.find( "#ingredients" );
       var $price = template.find( "#price" );

       if ( $name.value !== "" && $src.value !== "" && $ingredients !== "" && $price.value !== "")
       {
           pizza.update( { _id : pizza_id },
               {name : $name.value, src : $src.value, ingredients : $ingredients.value , price : $price.value} );
       }

       FlowRouter.go('/');
   }
});

Template.pizza_view.events ({
    'click #submit_pizza' : function ( event, template ) {
        event.preventDefault();
        var $name = template.find( "#name" );
        var $src = template.find( "#src" );
        var $ingredients = template.find( "#ingredients" );
        var $price = template.find( "#price" );

        if( $src.value == "" ) {
            $src = "https://cdn-catalog.pizzahut.fr/images/fr/20150511174125092.jpg";
        }

        if ( $name.value !== "" && $src !== "" && $ingredients !== "" && $price.value !== "")
        {
            pizza.insert( {name : $name.value, src : $src.value, ingredients : $ingredients.value , price : $price.value} );
        }
    }
});

Template.pizza_view.events ({
   'click .delete-btn' : function ( event ) {
       event.preventDefault();
       pizza.remove({_id: this._id});
   },
    'click .add-btn' : function (event ) {
       event.preventDefault();
        FlowRouter.go('/pizza/add');
    },
    'click .edit-btn' : function ( event ) {
        event.preventDefault();
        FlowRouter.go('/pizza/' + this._id);
    }
});