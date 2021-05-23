# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2021-04-19
### Added
- FirstComponent demo Component
- Product List Component
- Product Component
- Products Service
- CartList Component
- Cart Service
## [1.0.1] - 2021-05-11

### Changed
- Cart, Product, Order features moved to cart.module, product.module, order.module
### Added
- Added items calculation in Cart
- Added total calculation in Cart
- Increment, Decrement, Delete buttons added for cart item
- Shared module added
- HighlightDirective added to Shared module
- HighlightDirective bound to cart items
- Title added to AppComponent

## [1.0.2] - 2021-05-23

### Changed
- Cart logic moved to CartService from CartListComponent
- CommonModule and FormsModule imports added to SharedModule and removed from the others

### Added
- ConfigOptionsService injected to the FirstComponent
- ConstantsService injected to the FirstComponent
- generatedString injected to the FirstComponent with useFactory GeneratorFactory GeneratorService as a dependency
- getNewID method added to the GeneratorService
- LocalStorageService injected to the FirstComponent
- BorderDirective created and added to the FirstComponent
- uppercase pipe applied to category name at product.component.html
- async pipe applied to the product list at product-list.component.html
- OrderByPipe created and applied to the cart items list at cart-list.component.html
- Selectors for sort key and sort order added at cart-list.component.html 