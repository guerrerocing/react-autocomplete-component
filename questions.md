# Part 2

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

In React, Component and PureComponent are two base classes that can be used to create reusable UI components. The main difference between them is in how they handle updates and re-renders.

Example where it might break the app:

If the component contains nested objects or arrays in its props, a PureComponent may not detect changes to these nested values and fail to re-render the component as expected. In such cases, it is recommended to use Component instead, or to implement a custom shouldComponentUpdate method that checks for changes in the nested data structures. Additionally, PureComponent may not be suitable for components that rely on external data, such as AJAX requests, because the component may not re-render even if the data changes.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Using context and shouldComponentUpdate together can be dangerous because it can lead to unexpected behavior and performance issues.

When a component updates, React will check the shouldComponentUpdate method to determine whether or not to re-render the component. If the shouldComponentUpdate method returns false, the component will not re-render.

If a component is using context to retrieve data, any change in the context will trigger an update for all child components that are using that context. However, if any of those child components have a shouldComponentUpdate method that returns false, the component will not re-render even if the context data has changed. This can lead to inconsistent UI behavior and may cause bugs that are difficult to identify and fix.

## 3. Describe 3 ways to pass information from a component to its PARENT.

1. `Context`: A child component can pass information to its parent using context. The parent component can define a context that the child component can use to pass information. The child component can then update the context, and the parent component can listen for changes to the context.

2. `Callbacks`: Another way to pass information from a child component to its parent is by using callbacks. The parent component can define a callback function that is passed down to the child component as a prop. The child component can then call this callback with the necessary information as an argument.

3. `Refs`: A child component can also pass information to its parent using refs. The parent component can create a ref using the useRef hook, and pass it down to the child component as a prop. The child component can then update the ref, and the parent component can access the updated value of the ref.

## 4. Give 2 ways to prevent components from re-rendering.

1. `React.memo`: React provides a higher-order component called React.memo that can be used to memoize a component. Memoization is a technique that allows a function or component to remember its previous result and return the same result when called again with the same arguments. By default, React re-renders a component whenever its props or state change. However, if a component's props are the same as its previous props, then React.memo prevents the component from re-rendering.

2. `shouldComponentUpdate`: Class components in React have a method called shouldComponentUpdate, which can be used to determine whether a component should re-render or not. shouldComponentUpdate receives the next props and state as arguments, and should return a boolean value indicating whether the component should update or not. By default, shouldComponentUpdate returns true, but you can override it to prevent unnecessary re-renders.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a component that allows you to group a list of children without adding any extra nodes to the DOM. It's useful when you want to render a list of items without having to add a wrapper element to each item. Instead, you can use a fragment to group the list items together.

For example, if you're using a third-party library that assumes a certain DOM structure, and you're using a fragment to change the structure, it could potentially break the library. In general, however, fragments are a safe and useful feature of React that can help you write cleaner and more efficient code.

## 6. Give 3 examples of the HOC pattern.

1. Authentication HOC: This HOC is used to wrap a component and provide authentication functionality. It can check if the user is authenticated and redirect them if necessary.

2. Logging HOC: This HOC is used to wrap a component and provide logging functionality. It can log when the component is mounted, updated, and unmounted.

3. Styling HOC: This HOC is used to wrap a component and provide styling functionality. It can add styles to the component, based on props or other conditions.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

`Promises`: When a promise encounters an error, it will reject the promise with an error object that can be handled using the .catch() method.

`Callbacks`: When using callbacks, the convention is to pass an error object as the first argument, followed by the result. The callback function can then check if the error object is truthy and handle the error.

`async/await`: When using async/await, you can use a try/catch block to handle exceptions. The await keyword is used to pause the function execution until the promise resolves or rejects.

## 8. How many arguments does setState take and why is it async.

It could take two parameters, the new state to update and a callback function.

is asynchronous to improve performance and avoid unnecessary re-renders.

## 9. List the steps needed to migrate a Class to Function Component.

- Create a new function component with the same name as the class component.

- Remove the render() method and move its contents into the body of the function component.

- Replace all occurrences of this.props with props.

- Replace all occurrences of this.state with useState hook.

- If the component uses any lifecycle methods, you can replace them with useEffect hook.

- Remove the class component and its import statement from the file.

- If the component had any static properties or methods, add them as properties or functions to the function component.

## 10. List a few ways styles can be used with components.

- Inline styles: You can use the style attribute to add inline styles to an element, either as an object or a string.

- CSS Modules: CSS Modules is a popular approach that allows you to write traditional CSS stylesheets and import them into your components as JavaScript objects.
- CSS frameworks: You can use CSS frameworks like Bootstrap or Material UI to add pre-designed styles and components to your application.

## 11. How to render an HTML string coming from the server.

what we can do for adding that string html is with: `dangerouslySetInnerHTML`;

```javascript
function MyComponent({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
```
