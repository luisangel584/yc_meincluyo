import React from 'react';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';

import trim from 'lodash/trim';

import {StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Loading} from 'src/components';
import {ThemedView, Text, Header} from 'src/components';
import {IconHeader, TextHeader} from 'src/containers/HeaderComponent';
import Container from 'src/containers/Container';
import InputMobile from 'src/containers/input/InputMobile';
import Button from 'src/containers/Button';
import TextHtml from 'src/containers/TextHtml';

import ModalVerify from './containers/ModalVerify';

import {authSelector} from 'src/modules/auth/selectors';
import {languageSelector} from 'src/modules/common/selectors';
import {signInWithMobile} from 'src/modules/auth/actions';

import {showMessage} from 'react-native-flash-message';

import {margin} from 'src/components/config/spacing';
import {changeColor} from 'src/utils/text-html';
import {checkPhoneNumber} from 'src/modules/auth/service';

class LoginMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: '',
      country_no: '',
      visibleModal: false,
      loading: false,
      error: {
        message: null,
        errors: null,
      },
      verification: false,
    };
    this.confirmation = null;
  }

  componentDidMount() {
    this.unsubscribe = auth().onAuthStateChanged(user => {
      if (user && user.phoneNumber) {
        this.setState({
          verification: true,
          phone_number: user.phoneNumber,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  /**
   * Do login SMS
   * @param verify
   * @returns {Promise<void>}
   */
  handleLogin = async verify => {
    try {
      if (verify) {
        const idTokenResult = await auth().currentUser.getIdTokenResult();
        this.setState({
          visibleModal: false,
        });
        this.props.dispatch(signInWithMobile(idTokenResult.token));
      }
    } catch (e) {
      showMessage({
        message: e.message,
        type: 'danger',
      });
    }
  };

  /**
   * Handle login mobile
   * @returns {Promise<void>}
   */
  clickLogin = async () => {
    try {
      const {phone_number, country_no, verification} = this.state;

      // Get user phone number
      const user_phone_number = phone_number.includes(country_no)
        ? phone_number
        : country_no + phone_number;

      this.setState({
        loading: true,
        error: {
          errors: null,
          message: null,
        },
      });

      await checkPhoneNumber({
        phone_number: user_phone_number,
        type: 'login',
      });

      if (verification) {
        this.handleLogin(true);
        this.setState({
          loading: false,
        });
      } else {
        const confirmation = await auth().signInWithPhoneNumber(
          user_phone_number,
        );
        if (confirmation && confirmation._verificationId) {
          this.confirmation = confirmation;
          this.setState({
            visibleModal: true,
            loading: false,
          });
        } else {
          this.setState({
            loading: false,
          });
          showMessage({
            message: 'Something wrong.',
            type: 'danger',
          });
        }
      }
    } catch (e) {
      showMessage({
        message: e.message,
        type: 'danger',
      });
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {
      screenProps: {t, theme},
      auth: {pendingMobile},
    } = this.props;
    const {phone_number, country_no, error, loading, visibleModal} = this.state;
    const {message, errors} = error;

    return (
      <ThemedView isFullView>
        <Loading visible={pendingMobile} />
        <Header
          leftComponent={<IconHeader />}
          centerComponent={
            <TextHeader title={t('common:text_signin_mobile')} />
          }
        />
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>
            <Container style={styles.content}>
              <Text style={styles.description} colorSecondary>
                {t('auth:text_description_login_mobile')}
              </Text>
              {message ? (
                <TextHtml
                  value={message}
                  style={changeColor(theme.colors.error)}
                />
              ) : null}
              <InputMobile
                value={phone_number}
                onChangePhoneNumber={({value, code}) =>
                  this.setState({phone_number: trim(value), country_no: code})
                }
                error={errors && errors.phone_number}
              />
              <Button
                title={t('auth:text_button_login_mobile')}
                containerStyle={styles.button}
                loading={loading}
                onPress={this.clickLogin}
              />
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
        {visibleModal && (
          <ModalVerify
            visible={visibleModal}
            confirmation={this.confirmation}
            handleVerify={this.handleLogin}
            setModalVisible={visibleModal => this.setState({visibleModal})}
            phone={
              phone_number.includes(country_no)
                ? phone_number
                : country_no + phone_number
            }
          />
        )}
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: margin.base,
  },
  description: {
    marginBottom: margin.large,
  },
  button: {
    marginVertical: margin.big,
  },
});

const mapStateToProps = state => {
  return {
    auth: authSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(LoginMobile);
