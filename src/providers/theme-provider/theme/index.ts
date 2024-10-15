import colors from 'tailwindcss/colors'

export const QrazyTheme = {
  baseTheme: {
    colors: {
      ...colors,
      primary: {
        100: '#FFE5E5',
        200: '#FFB3B3',
        300: '#FF8080',
        400: '#FF4D4D',
        500: '#FF1A1A',
        600: '#E60000',
        700: '#B30000'
      },
      secondary: {
        100: '#F3F8FF',
        200: '#E0EEFF',
        300: '#BFD7FF',
        400: '#8EB8FF',
        500: '#5E8AFF',
        600: '#3A66FF',
        700: '#274BFF'
      },
      tertiary: {
        100: '#F5F5F5',
        200: '#E0E0E0',
        300: '#BFBFBF',
        400: '#999999',
        500: '#666666',
        600: '#4D4D4D',
        700: '#333333'
      },
      blue: {
        100: '#E0F3FF',
        200: '#B3E1FF',
        300: '#80CFFF',
        400: '#0083FF',
        500: '#0066CC',
        600: '#004C99',
        700: '#003366'
      },
      black: {
        100: '#F5F5F5',
        200: '#D9D9D9',
        300: '#A6A6A6',
        400: '#27292B',
        500: '#1F2021',
        600: '#141516',
        700: '#0A0A0A'
      },
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))'
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))'
      },
      primaryPro: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))'
      },
      secondaryPro: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))'
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))'
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))'
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))'
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      chart: {
        '1': 'hsl(var(--chart-1))',
        '2': 'hsl(var(--chart-2))',
        '3': 'hsl(var(--chart-3))',
        '4': 'hsl(var(--chart-4))',
        '5': 'hsl(var(--chart-5))'
      }
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    },
    fontFamily: {
      man: ['Manrope', 'sans-serif'],
      urban: ['Urbanist', 'sans-serif']
    },
    keyframes: {
      'accordion-down': {
        from: {
          height: '0'
        },
        to: {
          height: 'var(--radix-accordion-content-height)'
        }
      },
      'accordion-up': {
        from: {
          height: 'var(--radix-accordion-content-height)'
        },
        to: {
          height: '0'
        }
      }
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out'
    }
  },
  darkTheme: {
    colors: {
      ...colors,
      primary: {
        100: '#FFE5E5',
        200: '#FFB3B3',
        300: '#FF8080',
        400: '#FF4D4D',
        500: '#FF1A1A',
        600: '#E60000',
        700: '#B30000'
      },
      secondary: {
        100: '#F3F8FF',
        200: '#E0EEFF',
        300: '#BFD7FF',
        400: '#8EB8FF',
        500: '#5E8AFF',
        600: '#3A66FF',
        700: '#274BFF'
      },
      tertiary: {
        100: '#F5F5F5',
        200: '#E0E0E0',
        300: '#BFBFBF',
        400: '#999999',
        500: '#666666',
        600: '#4D4D4D',
        700: '#333333'
      },
      blue: {
        100: '#E0F3FF',
        200: '#B3E1FF',
        300: '#80CFFF',
        400: '#0083FF',
        500: '#0066CC',
        600: '#004C99',
        700: '#003366'
      },
      black: {
        100: '#F5F5F5',
        200: '#D9D9D9',
        300: '#A6A6A6',
        400: '#27292B',
        500: '#1F2021',
        600: '#141516',
        700: '#0A0A0A'
      },
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))'
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))'
      },
      primaryPro: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))'
      },
      secondaryPro: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))'
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))'
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))'
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))'
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      chart: {
        '1': 'hsl(var(--chart-1))',
        '2': 'hsl(var(--chart-2))',
        '3': 'hsl(var(--chart-3))',
        '4': 'hsl(var(--chart-4))',
        '5': 'hsl(var(--chart-5))'
      }
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    },
    fontFamily: {
      man: ['Manrope', 'sans-serif'],
      urban: ['Urbanist', 'sans-serif']
    },
    keyframes: {
      'accordion-down': {
        from: {
          height: '0'
        },
        to: {
          height: 'var(--radix-accordion-content-height)'
        }
      },
      'accordion-up': {
        from: {
          height: 'var(--radix-accordion-content-height)'
        },
        to: {
          height: '0'
        }
      }
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out'
    }
  }
}
