import React from "react";
import "./styles.css";
import marked from "marked";

marked.setOptions({
    breaks: true,
  });
  
  class App extends React.Component {
    state = {
      text: "",
      icon1: "",
      icon2: "",
      expandedEditor: "",
      expandedPreview: "",
    };
    first = React.createRef();
    second = React.createRef();
    firstHeader = React.createRef();
    secondHeader = React.createRef();
  
    defaultText = 
    `# Welcome to my React Markdown Previewer!
  
  ## This is a sub-heading...  
  ### And here's some other cool stuff:  
    
  Heres some code, \`<div></div>\`, between 2 backticks.  
  
  \`\`\`  
  // this is multi-line code:  
  
  function anotherExample(firstLine, lastLine) {  
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {  
      return multiLineCode;  
    }  
  }  
  \`\`\`  
    
  You can also make text **bold**... whoa!  
  Or _italic_.  
  Or... wait for it... **_both!_**  
  And feel free to go crazy ~~crossing stuff out~~.  
    
  There's also [links](https://www.freecodecamp.com), and  
  > Block Quotes!  
    
  And if you want to get really crazy, even tables:  
    
  Wild Header | Crazy Header | Another Header?  
  ------------ | ------------- | -------------   
  Your content can | be here, and it | can be here....  
  And here. | Okay. | I think we get it.  
    
  - And of course there are lists.  
    - Some are bulleted.  
       - With different indentation levels.  
          - That look like this.  
    
    
  1. And there are numbererd lists too.  
  1. Use just 1s if you want!   
  1. But the list goes on...  
  - Even if you use dashes or asterisks.  
  * And last but not least, let's not forget embedded images:  
    
  ![React Logo w/ Text](https://goo.gl/Umyytc)  
  `
  
    componentDidMount() {
      this.setState({
        text: this.defaultText,
        icon1: "fas fa-expand-arrows-alt",
        icon2: "fas fa-expand-arrows-alt",
        expandedEditor: "",
        expandedPreview: "",
      });
    }
  
    changeView1 = () => {
      if (this.state.icon1 === "fas fa-expand-arrows-alt") {
        this.setState({
          icon1: "fas fa-compress-arrows-alt",
          expandedEditor: "expanded-editor",
        });
        this.second.current.style.display = "none";
        this.firstHeader.current.style.width = "calc(95% + 10px)";
      } else {
        this.second.current.style.display = "block";
        this.firstHeader.current.style.width = "30pc";
        this.setState({ icon1: "fas fa-expand-arrows-alt", expandedEditor: "" });
      }
    };
    changeView2 = () => {
      if (this.state.icon2 === "fas fa-expand-arrows-alt") {
        this.setState({
          icon2: "fas fa-compress-arrows-alt",
          expandedPreview: "expanded-preview",
        });
        this.first.current.style.display = "none";
        this.secondHeader.current.style.width = "calc(90% + 60px)";
      } else {
        this.first.current.style.display = "flex";
        this.secondHeader.current.style.width = "calc(60% + 60px)";
        this.setState({ icon2: "fas fa-expand-arrows-alt", expandedPreview: "" });
      }
    };
  
    render() {
      return (
        <main>
          <div ref={this.first} className="textEditor">
            <div ref={this.firstHeader} className="header">
              <p>Editor</p>
              <i onClick={this.changeView1} className={this.state.icon1}></i>
            </div>
            <textarea
              id="editor"
              className={`editor ${this.state.expandedEditor}`}
              value={this.state.text}
              onChange={(e) => this.setState({ text: e.target.value })}
            ></textarea>
          </div>
  
          <div ref={this.second}>
            <div ref={this.secondHeader} className="header2">
              <p>Previewer</p>
              <i onClick={this.changeView2} className={this.state.icon2}></i>
            </div>
            <div
              className={`preview ${this.state.expandedPreview}`}
              id="preview"
              dangerouslySetInnerHTML={{ __html: marked(this.state.text) }}
            ></div>
          </div>
        </main>
      );
    }
  }

  export default App;