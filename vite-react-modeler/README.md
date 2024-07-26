# React Modeler Example

1. Clone `camunda-web-modeler` repository
    ```shell
    git clone git@github.com:Miragon/camunda-web-modeler.git
    ```

2. Install dependencies
    ```shell
    # cd camunda-web-modeler
    yarn install
    ```
   
3. Build the project
    ```shell
    # cd camunda-web-modeler
    yarn build
    ```
   
4. Install dependencies
    ```bash
    # cd vite-react-modeler
    yarn install
    ```
   
   > :information_source: We use *yarn v4* as package manager.  
   > If you encounter an error, check the path to the `camunda-web-modeler` repository within
   > `package.json > resolutions > @miragon/camunda-web-modeler`.
   > The following hirarchy is assumed:
   > ```text
   > *
   > ├── camunda-web-modeler
   > └── camunda-web-modeler-examples
   >     └── vite-react-modeler
   > ```
   
5. Start the development server
    ```bash
    # cd vite-react-modeler
    yarn dev
    ```