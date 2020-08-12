const path = require( 'path' );

// module alias
exports.alias = {
    'components': path.resolve( __dirname, 'src/js/components' ),
    'constants': path.resolve( __dirname, 'src/js/constants' ),
    'store': path.resolve( __dirname, 'src/js/store' ),
    'modules': path.resolve( __dirname, 'src/js/modules' ),
    'utils': path.resolve( __dirname, 'src/js/utils' ),
    // scss globals
    'scss-globals': path.resolve( __dirname, 'src/scss/globals/index.scss' )
};