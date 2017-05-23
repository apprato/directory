import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Modal, Row, Col} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Bert} from 'meteor/themeteorchef:bert';
import '../../../modules/validation.js';

export default class AddDocumentModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddDocument = this.handleAddDocument.bind(this);
  }

  handleAddDocument() {

    const doc = {
      education: [
        {
          school: document.querySelector('[name="school"]').value,
          dateFrom: document.querySelector('[name="dateFrom"]').value,
          dateTo: document.querySelector('[name="dateTo"]').value,
          tertiaryEducation: document.querySelector('[name="tertiaryEducation"]').value,
          areaOfStudy: document.querySelector('[name="areaOfStudy"]').value,
          description: this.description.value
        }
      ]
    };


    Meteor.call('trainers.education.upsert', doc, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
//        if (response.insertedId) browserHistory.push(`/documents/${response.insertedId}`);
        this.props.modal.close();
      }
    });
  }

  componentDidMount() {
    $(this.addDocumentForm).validate({
      rules: {
        school: {required: true},
        dateFrom: {required: true},
        dateTo: {required: true},
        tertiaryEducation: {required: true},
        areaOfStudy: {required: true},
        description: {required: false},
      },
      messages: {
        school: {required: 'Please add the school.'},
        dateFrom: {required: 'Please add the Date attended from.'},
        dateTo: {required: 'Please add the Date attended to.'},
        tertiaryEducation: {required: 'Please add your tertiary education'},
        areaOfStudy: {required: 'Please add the area of study.'},
        description: {required: 'Please add a description.'},
      },
      submitHandler: this.handleAddDocument,
    });
  }

  render() {
    const {modal} = this.props;

    return (
      <form
        ref={addDocumentForm => (this.addDocumentForm = addDocumentForm)}
        onSubmit={event => event.preventDefault()}
      >
        <Modal.Body>
          <Row>
            <Col xs={ 12 } sm={ 12 } md={ 12 }>
              <FormGroup>
                <ControlLabel>School</ControlLabel>
                <input
                  ref={school => (this.school = school)}
                  type="text"
                  name="school"
                  className="form-control"
                />
              </FormGroup>
            </Col>
            <Col xs={ 6 } sm={ 6 } md={ 6 }>
              <FormGroup controlId="dateFrom">
                <ControlLabel>Dates Attended</ControlLabel>
                <FormControl componentClass="select" placeholder="select" ref="dateFrom" name="dateFrom">
                  <option value="">From</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1994">1994</option>
                  <option value="1993">1993</option>
                  <option value="1992">1992</option>
                  <option value="1991">1991</option>
                  <option value="1990">1990</option>
                  <option value="1989">1989</option>
                  <option value="1988">1988</option>
                  <option value="1987">1987</option>
                  <option value="1986">1986</option>
                  <option value="1985">1985</option>
                  <option value="1984">1984</option>
                  <option value="1983">1983</option>
                  <option value="1982">1982</option>
                  <option value="1981">1981</option>
                  <option value="1980">1980</option>
                  <option value="1979">1979</option>
                  <option value="1978">1978</option>
                  <option value="1977">1977</option>
                  <option value="1976">1976</option>
                  <option value="1975">1975</option>
                  <option value="1974">1974</option>
                  <option value="1973">1973</option>
                  <option value="1972">1972</option>
                  <option value="1971">1971</option>
                  <option value="1970">1970</option>
                  <option value="1969">1969</option>
                  <option value="1968">1968</option>
                  <option value="1967">1967</option>
                  <option value="1966">1966</option>
                  <option value="1965">1965</option>
                  <option value="1964">1964</option>
                  <option value="1963">1963</option>
                  <option value="1962">1962</option>
                  <option value="1961">1961</option>
                  <option value="1960">1960</option>
                  <option value="1959">1959</option>
                  <option value="1958">1958</option>
                  <option value="1957">1957</option>
                  <option value="1956">1956</option>
                  <option value="1955">1955</option>
                  <option value="1954">1954</option>
                  <option value="1953">1953</option>
                  <option value="1952">1952</option>
                  <option value="1951">1951</option>
                  <option value="1950">1950</option>
                  <option value="1949">1949</option>
                  <option value="1948">1948</option>
                  <option value="1947">1947</option>
                  <option value="1946">1946</option>
                  <option value="1945">1945</option>
                  <option value="1944">1944</option>
                  <option value="1943">1943</option>
                  <option value="1942">1942</option>
                  <option value="1941">1941</option>
                  <option value="1940">1940</option>
                  <option value="1939">1939</option>
                  <option value="1938">1938</option>
                  <option value="1937">1937</option>
                  <option value="1936">1936</option>
                  <option value="1935">1935</option>
                  <option value="1934">1934</option>
                  <option value="1933">1933</option>
                  <option value="1932">1932</option>
                  <option value="1931">1931</option>
                  <option value="1930">1930</option>
                  <option value="1929">1929</option>
                  <option value="1928">1928</option>
                  <option value="1927">1927</option>
                  <option value="1926">1926</option>
                  <option value="1925">1925</option>
                  <option value="1924">1924</option>
                  <option value="1923">1923</option>
                  <option value="1922">1922</option>
                  <option value="1921">1921</option>
                  <option value="1920">1920</option>
                  <option value="1919">1919</option>
                  <option value="1918">1918</option>
                  <option value="1917">1917</option>
                  <option value="1916">1916</option>
                  <option value="1915">1915</option>
                  <option value="1914">1914</option>
                  <option value="1913">1913</option>
                  <option value="1912">1912</option>
                  <option value="1911">1911</option>
                  <option value="1910">1910</option>
                  <option value="1909">1909</option>
                  <option value="1908">1908</option>
                  <option value="1907">1907</option>
                  <option value="1906">1906</option>
                  <option value="1905">1905</option>
                  <option value="1904">1904</option>
                  <option value="1903">1903</option>
                  <option value="1902">1902</option>
                  <option value="1901">1901</option>
                  <option value="1900">1900</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={ 6 } sm={ 6 } md={ 6 }>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>&nbsp;</ControlLabel>
                <FormControl componentClass="select" placeholder="select" ref="dateTo" name="dateTo">
                  <option value="">To (or expected date)</option>
                  <option value="2028">2028</option>
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1994">1994</option>
                  <option value="1993">1993</option>
                  <option value="1992">1992</option>
                  <option value="1991">1991</option>
                  <option value="1990">1990</option>
                  <option value="1989">1989</option>
                  <option value="1988">1988</option>
                  <option value="1987">1987</option>
                  <option value="1986">1986</option>
                  <option value="1985">1985</option>
                  <option value="1984">1984</option>
                  <option value="1983">1983</option>
                  <option value="1982">1982</option>
                  <option value="1981">1981</option>
                  <option value="1980">1980</option>
                  <option value="1979">1979</option>
                  <option value="1978">1978</option>
                  <option value="1977">1977</option>
                  <option value="1976">1976</option>
                  <option value="1975">1975</option>
                  <option value="1974">1974</option>
                  <option value="1973">1973</option>
                  <option value="1972">1972</option>
                  <option value="1971">1971</option>
                  <option value="1970">1970</option>
                  <option value="1969">1969</option>
                  <option value="1968">1968</option>
                  <option value="1967">1967</option>
                  <option value="1966">1966</option>
                  <option value="1965">1965</option>
                  <option value="1964">1964</option>
                  <option value="1963">1963</option>
                  <option value="1962">1962</option>
                  <option value="1961">1961</option>
                  <option value="1960">1960</option>
                  <option value="1959">1959</option>
                  <option value="1958">1958</option>
                  <option value="1957">1957</option>
                  <option value="1956">1956</option>
                  <option value="1955">1955</option>
                  <option value="1954">1954</option>
                  <option value="1953">1953</option>
                  <option value="1952">1952</option>
                  <option value="1951">1951</option>
                  <option value="1950">1950</option>
                  <option value="1949">1949</option>
                  <option value="1948">1948</option>
                  <option value="1947">1947</option>
                  <option value="1946">1946</option>
                  <option value="1945">1945</option>
                  <option value="1944">1944</option>
                  <option value="1943">1943</option>
                  <option value="1942">1942</option>
                  <option value="1941">1941</option>
                  <option value="1940">1940</option>
                  <option value="1939">1939</option>
                  <option value="1938">1938</option>
                  <option value="1937">1937</option>
                  <option value="1936">1936</option>
                  <option value="1935">1935</option>
                  <option value="1934">1934</option>
                  <option value="1933">1933</option>
                  <option value="1932">1932</option>
                  <option value="1931">1931</option>
                  <option value="1930">1930</option>
                  <option value="1929">1929</option>
                  <option value="1928">1928</option>
                  <option value="1927">1927</option>
                  <option value="1926">1926</option>
                  <option value="1925">1925</option>
                  <option value="1924">1924</option>
                  <option value="1923">1923</option>
                  <option value="1922">1922</option>
                  <option value="1921">1921</option>
                  <option value="1920">1920</option>
                  <option value="1919">1919</option>
                  <option value="1918">1918</option>
                  <option value="1917">1917</option>
                  <option value="1916">1916</option>
                  <option value="1915">1915</option>
                  <option value="1914">1914</option>
                  <option value="1913">1913</option>
                  <option value="1912">1912</option>
                  <option value="1911">1911</option>
                  <option value="1910">1910</option>
                  <option value="1909">1909</option>
                  <option value="1908">1908</option>
                  <option value="1907">1907</option>
                  <option value="1906">1906</option>
                  <option value="1905">1905</option>
                  <option value="1904">1904</option>
                  <option value="1903">1903</option>
                  <option value="1902">1902</option>
                  <option value="1901">1901</option>
                  <option value="1900">1900</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={ 12 } sm={ 12 } md={ 12 }>
              <FormGroup>
                <ControlLabel>Tertiary Education (Degree, Diploma, Certification)</ControlLabel>
                <input
                  ref={tertiaryEducation => (this.tertiaryEducation = tertiaryEducation)}
                  type="text"
                  name="tertiaryEducation"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Area of Study (optional)</ControlLabel>
                <input
                  ref={areaOfStudy => (this.areaOfStudy = areaOfStudy)}
                  type="text"
                  name="areaOfStudy"
                  className="form-control"
                />
              </FormGroup>
              <ControlLabel>Description (optional)</ControlLabel>
              <textarea
                ref={description => (this.description = description)}
                name="description"
                className="form-control"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ modal.close } bsStyle="default">Cancel</Button>
          <Button type="submit" bsStyle="success">Add Education Details</Button>
        </Modal.Footer>
      </form>
    );
  }
}

AddDocumentModalForm.propTypes = {
  modal: React.PropTypes.object,
};
