Meteor.startup
(
    function ()
    {
        // Populate once
        if( ! pizza.find().count() )
        {
            pizza.insert( {
                name : "Margherita",
                src : "https://cdn-catalog.pizzahut.fr/images/fr/20150511174125092.jpg",
                ingredients : "Sauce tomate à l'Origan et double mozzarella fraîche.",
                price : 7.50
            } );
        }
    }
);