# Watermelon summer

## Description

Single player run and jump game inspired by hot Mediterranean summers where you need to protect yourself from the heat and stay refreshed and hydrated. The player can move horizontally and vertically in order to catch watermelon slices 🍉 which give them points while avoiding fireballs which take away lives ❤️.

![Alt text](./images/sample%20game%20screenshot.gif "Game screenshot")

## Code structure

Game entities (player, watermelons and fireballs) are object instances of their corresponding classes among which there is a hierarchy so that they share some of attributes for consistency and and methods for code reuse. For example, the parent class for all three moving entities takes care of moving those entities and making sure they don't go outside the game area.

An endless loop using internalGameLoop takes care of calling the different functions to keep the game going such as creating and moving inanimate entities, moving the player, checking for collisions, cleaning up unneeded elements, etc.

Almost all DOM manipulation is done outside the classes with the aim to have classes just take care of the underlying game logic.

## Game visuals
- All images are all pixel art created with AI and tweaked in Figma.