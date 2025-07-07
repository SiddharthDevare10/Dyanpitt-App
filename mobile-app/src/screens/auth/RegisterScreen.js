import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDown from 'react-native-paper-dropdown';
import DatePicker from 'react-native-date-picker';
import apiService from '../../services/apiService';

export default function RegisterScreen({ navigation }) {
  const theme = useTheme();
  
  const [currentStep, setCurrentStep] = useState('email'); // 'email', 'otp', 'profile'
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    fullName: '',
    countryCode: '+91',
    phoneNumber: '',
    dateOfBirth: new Date(),
    gender: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpTimer, setOtpTimer] = useState(0);

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors = {};
    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'Please enter complete 6-digit OTP';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfile = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateEmail()) return;
    
    setIsLoading(true);
    try {
      const response = await apiService.sendOtp(formData.email);
      if (response.success) {
        setCurrentStep('otp');
        setOtpTimer(60);
        startOtpTimer();
      } else {
        Alert.alert('Error', response.message || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!validateOtp()) return;
    
    setIsLoading(true);
    try {
      const response = await apiService.verifyOtp(formData.email, formData.otp);
      if (response.success) {
        setCurrentStep('profile');
      } else {
        Alert.alert('Error', response.message || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!validateProfile()) return;
    
    setIsLoading(true);
    try {
      const userData = {
        email: formData.email,
        otp: formData.otp,
        fullName: formData.fullName,
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
        dateOfBirth: formData.dateOfBirth.toISOString().split('T')[0],
        gender: formData.gender,
        password: formData.password,
      };
      
      const response = await apiService.register(userData);
      if (response.success) {
        Alert.alert(
          'Registration Successful',
          'Your account has been created successfully!',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        Alert.alert('Error', response.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const startOtpTimer = () => {
    const timer = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const renderEmailStep = () => (
    <View style={styles.stepContainer}>
      <Text variant="headlineSmall" style={[styles.stepTitle, { color: theme.colors.onBackground }]}>
        Create Account
      </Text>
      <Text variant="bodyLarge" style={[styles.stepSubtitle, { color: theme.colors.onSurfaceVariant }]}>
        Enter your email to get started
      </Text>
      
      <TextInput
        label="Email Address"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!errors.email}
        style={styles.input}
      />
      {errors.email && (
        <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.email}
        </Text>
      )}
      
      <Button
        mode="contained"
        onPress={handleSendOtp}
        loading={isLoading}
        disabled={isLoading}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        contentStyle={styles.buttonContent}
      >
        {isLoading ? 'Sending OTP...' : 'Send OTP'}
      </Button>
    </View>
  );

  const renderOtpStep = () => (
    <View style={styles.stepContainer}>
      <Text variant="headlineSmall" style={[styles.stepTitle, { color: theme.colors.onBackground }]}>
        Verify Email
      </Text>
      <Text variant="bodyLarge" style={[styles.stepSubtitle, { color: theme.colors.onSurfaceVariant }]}>
        Enter the 6-digit code sent to {formData.email}
      </Text>
      
      <TextInput
        label="Enter OTP"
        value={formData.otp}
        onChangeText={(value) => handleInputChange('otp', value.replace(/\D/g, '').slice(0, 6))}
        mode="outlined"
        keyboardType="numeric"
        maxLength={6}
        error={!!errors.otp}
        style={styles.input}
      />
      {errors.otp && (
        <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.otp}
        </Text>
      )}
      
      <Button
        mode="contained"
        onPress={handleVerifyOtp}
        loading={isLoading}
        disabled={isLoading}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        contentStyle={styles.buttonContent}
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </Button>
      
      {otpTimer > 0 ? (
        <Text variant="bodyMedium" style={[styles.timerText, { color: theme.colors.onSurfaceVariant }]}>
          Resend OTP in {otpTimer}s
        </Text>
      ) : (
        <Button
          mode="text"
          onPress={handleSendOtp}
          disabled={isLoading}
          labelStyle={{ color: theme.colors.primary }}
        >
          Resend OTP
        </Button>
      )}
    </View>
  );

  const renderProfileStep = () => (
    <ScrollView style={styles.stepContainer} showsVerticalScrollIndicator={false}>
      <Text variant="headlineSmall" style={[styles.stepTitle, { color: theme.colors.onBackground }]}>
        Complete Profile
      </Text>
      <Text variant="bodyLarge" style={[styles.stepSubtitle, { color: theme.colors.onSurfaceVariant }]}>
        Fill in your details to complete registration
      </Text>
      
      <View style={styles.formSection}>
        <TextInput
          label="Full Name"
          value={formData.fullName}
          onChangeText={(value) => handleInputChange('fullName', value)}
          mode="outlined"
          error={!!errors.fullName}
          style={styles.input}
        />
        {errors.fullName && (
          <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
            {errors.fullName}
          </Text>
        )}

        <View style={styles.phoneContainer}>
          <TextInput
            label="Country Code"
            value={formData.countryCode}
            onChangeText={(value) => handleInputChange('countryCode', value)}
            mode="outlined"
            style={[styles.input, styles.countryCodeInput]}
          />
          <TextInput
            label="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(value) => handleInputChange('phoneNumber', value.replace(/\D/g, '').slice(0, 10))}
            mode="outlined"
            keyboardType="numeric"
            error={!!errors.phoneNumber}
            style={[styles.input, styles.phoneInput]}
          />
        </View>
        {errors.phoneNumber && (
          <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
            {errors.phoneNumber}
          </Text>
        )}

        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
          contentStyle={styles.dateButtonContent}
          labelStyle={{ color: theme.colors.onSurface }}
        >
          Date of Birth: {formData.dateOfBirth.toLocaleDateString()}
        </Button>

        <DropDown
          label="Gender"
          mode="outlined"
          visible={showGenderDropdown}
          showDropDown={() => setShowGenderDropdown(true)}
          onDismiss={() => setShowGenderDropdown(false)}
          value={formData.gender}
          setValue={(value) => handleInputChange('gender', value)}
          list={genderOptions}
          dropDownStyle={{ backgroundColor: theme.colors.surface }}
        />
        {errors.gender && (
          <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
            {errors.gender}
          </Text>
        )}

        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          mode="outlined"
          secureTextEntry={!showPassword}
          error={!!errors.password}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {errors.password && (
          <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
            {errors.password}
          </Text>
        )}

        <TextInput
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          mode="outlined"
          secureTextEntry={!showConfirmPassword}
          error={!!errors.confirmPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
        />
        {errors.confirmPassword && (
          <Text variant="bodySmall" style={[styles.errorText, { color: theme.colors.error }]}>
            {errors.confirmPassword}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={isLoading}
          disabled={isLoading}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.buttonContent}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </View>

      <DatePicker
        modal
        open={showDatePicker}
        date={formData.dateOfBirth}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setShowDatePicker(false);
          handleInputChange('dateOfBirth', date);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => {
            if (currentStep === 'email') {
              navigation.goBack();
            } else if (currentStep === 'otp') {
              setCurrentStep('email');
            } else {
              setCurrentStep('otp');
            }
          }}
          style={styles.backButton}
        />
      </View>

      <Surface style={[styles.formContainer, { backgroundColor: theme.colors.surface }]} elevation={1}>
        {currentStep === 'email' && renderEmailStep()}
        {currentStep === 'otp' && renderOtpStep()}
        {currentStep === 'profile' && renderProfileStep()}
      </Surface>

      <View style={styles.footer}>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Already have an account?{' '}
        </Text>
        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          labelStyle={{ color: theme.colors.primary, fontWeight: '600' }}
          compact
        >
          Sign In
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  formContainer: {
    flex: 1,
    margin: 24,
    borderRadius: 16,
    padding: 24,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepSubtitle: {
    marginBottom: 32,
    lineHeight: 24,
  },
  formSection: {
    gap: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  errorText: {
    marginTop: -12,
    marginLeft: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  countryCodeInput: {
    flex: 0.3,
  },
  phoneInput: {
    flex: 0.7,
  },
  dateButton: {
    justifyContent: 'flex-start',
  },
  dateButtonContent: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },
  button: {
    borderRadius: 12,
    marginTop: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  timerText: {
    textAlign: 'center',
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
  },
});