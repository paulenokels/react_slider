import React, { Component } from 'react';
import './App.css';
import {Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class ImageSlider extends Component {
  constructor (props) {
    super(props);
    this.state = {currentSlideIndex: 0};
    this.changeSlide = this.changeSlide.bind(this);
  }
  changeSlide(slideIndex) {
    this.setState({
      currentSlideIndex: slideIndex
    });
  }

    render() {
    return (
      <div>
        <Row className="row wrapper">
          <Col md={1} mdOffset={1} className="prev-arrow">
            <PrevArrow changeSlide={this.changeSlide} currentSlideIndex={this.state.currentSlideIndex} slidesCount={this.props.slides.length} />
          </Col>

          <Col md={8} className="image-area">
            <SlideShow slides={this.props.slides} currentSlideIndex={this.state.currentSlideIndex} time={this.props.time} changeSlide={this.changeSlide}/>
          </Col>

          <Col md={1} className="next-arrow">
              <NextArrow changeSlide={this.changeSlide} currentSlideIndex={this.state.currentSlideIndex} slidesCount={this.props.slides.length} />
          </Col>
        </Row>

        <Row>
          <Col className="slide-position" mdOffset={5}>
            <SlidePosition changeSlide={this.changeSlide} currentSlideIndex={this.state.currentSlideIndex} slidesCount={this.props.slides.length}/>
          </Col>
        </Row>
      </div>
    );
  }
}

class NextArrow extends Component {
  constructor(props) {
    super(props);
    this.doNextSlide = this.doNextSlide.bind(this);
  }
  doNextSlide() {
    const currentSlideIndex = this.props.currentSlideIndex;
    var nextSlideIndex;
    const lastSlide = this.props.slidesCount - 1;
   if (currentSlideIndex === lastSlide) {
      nextSlideIndex = 0;
    }
    else {
        nextSlideIndex = currentSlideIndex + 1;
    }
    this.props.changeSlide(nextSlideIndex);
  }
  render () {
      return (
        <div onClick={this.doNextSlide}>
          <p></p>
        </div>
      );
  }
}
class PrevArrow extends Component {
  constructor(props) {
    super(props);
    this.doPrevSlide = this.doPrevSlide.bind(this);
  }
  doPrevSlide() {
    const currentSlideIndex = this.props.currentSlideIndex;
    var prevSlideIndex;
    const firstSlide = 0;
   if (currentSlideIndex === firstSlide) {
      prevSlideIndex = this.props.slidesCount - 1;
    }
    else {
        prevSlideIndex = currentSlideIndex - 1;
    }
    this.props.changeSlide(prevSlideIndex);
  }
  render () {
    return (
      <div onClick={this.doPrevSlide}>
        <p></p>
      </div>
    );
  }
}
class SlideShow extends Component {
  constructor(props) {
    super(props);
    this.pauseSlide = this.pauseSlide.bind(this);
    this.playSlide = this.playSlide.bind(this);
  }

componentDidMount() {
    this.timer = setInterval(() =>{
      this.doSlide(this.props.currentSlideIndex);
    }, this.props.time);
  }
  doSlide(currentSlideIndex) {
    var nextSlideIndex;
    const lastSlide = this.props.slides.length - 1;
   if (currentSlideIndex === lastSlide) {
      nextSlideIndex = 0;
    }
    else {
        nextSlideIndex = currentSlideIndex + 1;
    }
    this.props.changeSlide(nextSlideIndex);
  }
  componentWillUnmount () {
    this.pauseSlide();
  }
  pauseSlide() {
    clearInterval(this.timer);
  }
  playSlide() {
    this.componentDidMount();
  }
  render () {
    return (
      <div onMouseEnter={this.pauseSlide} onMouseLeave={this.playSlide}>
        <img role="presentation" className="slider-img" src={this.props.slides[this.props.currentSlideIndex].url}/>
        <p className="img-title">{this.props.slides[this.props.currentSlideIndex].title}</p>
      </div>
    );
  }
}
class SlidePosition extends Component {
  constructor(props) {
    super(props);
    this.changePosition = this.changePosition.bind(this);
  }
  changePosition(event) {
    const index = event.target.id;
    this.props.changeSlide(parseInt(index));
  }
  render () {
    var positions = [];
    for (var slide = 0; slide < this.props.slidesCount; slide++) {
      var position = null;
      if (slide === this.props.currentSlideIndex) {
        position = <span onClick={this.changePosition} key={slide} id={slide} className="current-slide"></span>;
      }
      else {
        position = <span key={slide} id={slide} onClick={this.changePosition}></span>;
      }
      positions.push(position);
    }
    return (
      <div>
        {positions}
      </div>
    );
  }
}
export default ImageSlider;
