# Steganography Application: Securely Hiding Text Messages in Digital Images

A comprehensive Python-based steganography tool that allows users to securely embed and extract secret text messages within image files using Least Significant Bit (LSB) manipulation.

## 🌟 Features

### Core Functionality
- **LSB Steganography**: Hide messages using 1-3 bits per color channel
- **Lossless Format Support**: Optimized for PNG, BMP, TIFF formats
- **Real-time Capacity Calculation**: Know exactly how much data can be hidden
- **Multiple Interfaces**: Both CLI and GUI applications

### Security Features
- **AES Encryption**: Password-based protection using AES-256-CBC
- **Data Compression**: Zlib compression to maximize capacity
- **Secure Key Derivation**: PBKDF2 with 100,000 iterations
- **Header Protection**: Encrypted metadata prevents detection

### Quality Analysis
- **PSNR/SSIM Metrics**: Quantitative image quality assessment
- **Histogram Analysis**: Visual comparison of original vs stego images
- **Statistical Detection**: Chi-square tests for steganography detection
- **Capacity vs Quality Trade-offs**: Comprehensive evaluation tools

## 🚀 Quick Start

### Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### Basic Usage

#### Command Line Interface
```bash
# Embed a message
python cli.py embed -i cover.png -o stego.png -m "Secret message" -p

# Extract a message
python cli.py extract -i stego.png -p

# Check image capacity
python cli.py capacity -i image.png --bits 2

# Analyze stego quality
python cli.py analyze -o cover.png -s stego.png
```

#### Graphical User Interface
```bash
python gui.py
```

#### Python API
```python
from steg_lsb import LSBSteganography

# Initialize with 1 bit per channel
steg = LSBSteganography(bits_per_channel=1)

# Embed message
steg.embed_text(
    cover_image_path="cover.png",
    text="Secret message",
    output_path="stego.png",
    password="mypassword",
    compress=True
)

# Extract message
message = steg.extract_text("stego.png", password="mypassword")
print(message)
```

## 📁 Project Structure

```
steganography-app/
├── steg_lsb.py          # Core steganography library
├── cli.py               # Command-line interface
├── gui.py               # PyQt5 GUI application
├── evaluation.py        # Comprehensive evaluation suite
├── demo.py              # Interactive demonstrations
├── requirements.txt     # Python dependencies
├── README.md           # This file
└── PROJECT_REPORT.pdf  # Detailed academic report
```

## 🔧 Technical Details

### LSB Steganography Algorithm

The application uses Least Significant Bit substitution to hide data:

1. **Data Preparation**:
   - Convert secret text to UTF-8 bytes
   - Optional compression using zlib
   - Optional AES encryption with random IV
   - Add metadata header (magic bytes, flags, payload size)

2. **Embedding Process**:
   - Load cover image and convert to RGB
   - Replace LSBs of pixel values with message bits
   - Support for 1-3 bits per color channel
   - Save as lossless PNG format

3. **Extraction Process**:
   - Extract LSBs from pixel values
   - Parse metadata header
   - Decrypt and decompress if needed
   - Convert back to UTF-8 text

### Security Implementation

- **Encryption**: AES-256-CBC with PBKDF2 key derivation
- **Salt**: Random 16-byte salt stored in header
- **IV**: Random initialization vector for each encryption
- **Padding**: PKCS7 padding for block cipher
- **Compression**: Zlib compression reduces detectability

### Quality Metrics

- **PSNR (Peak Signal-to-Noise Ratio)**: Measures pixel-level differences
- **SSIM (Structural Similarity Index)**: Perceptual quality assessment
- **MSE (Mean Squared Error)**: Average pixel difference
- **Histogram Analysis**: Statistical distribution comparison

## 📊 Evaluation Results

Run the comprehensive evaluation:
```bash
python evaluation.py
```

### Typical Performance
- **PSNR**: 45-60 dB (excellent quality)
- **SSIM**: 0.995-0.999 (imperceptible changes)
- **Capacity**: ~32,000 bytes for 512×512 image (1 bit/channel)
- **Speed**: <1 second for typical messages

### Bit Depth Comparison

| Bits/Channel | Capacity | PSNR (avg) | Detectability |
|--------------|----------|------------|---------------|
| 1            | 1x       | 50+ dB     | Low           |
| 2            | 2x       | 35-45 dB   | Medium        |
| 3            | 3x       | 25-35 dB   | High          |

## 🎮 Interactive Demo

Experience all features with the interactive demo:
```bash
python demo.py
```

The demo includes:
- Basic embedding and extraction
- Password protection
- Bit depth comparison
- Compression benefits
- Capacity limits
- File format effects

## 🖥️ GUI Features

The PyQt5 GUI application provides:

### Embed Tab
- Drag-and-drop image loading
- Real-time capacity calculation
- Live message statistics
- Password protection toggle
- Compression options
- Image preview

### Extract Tab
- Drag-and-drop stego image loading
- Password input
- Extracted message display
- Save to file option

### Analysis Tab
- Side-by-side image comparison
- Quality metrics calculation
- Statistical analysis results

## 🛡️ Security Considerations

### Legitimate Uses
- **Digital Watermarking**: Copyright protection
- **Secure Communication**: Covert channels in restrictive environments
- **Metadata Protection**: Hiding sensitive information in media files
- **Authentication**: Embedding verification data

### Defensive Awareness
- **Forensics Training**: Understanding attacker techniques
- **Detection Methods**: Statistical analysis and steganalysis
- **Countermeasures**: Identifying suspicious image patterns

### Ethical Guidelines
- Educational and research purposes only
- Respect privacy and legal boundaries
- Consider defensive applications
- Report malicious usage

## 📈 Performance Optimization

### Best Practices
1. **Use PNG format** for lossless storage
2. **1 bit per channel** for best invisibility
3. **Enable compression** for repetitive messages
4. **Password protection** for sensitive data
5. **Test capacity** before embedding

### Optimization Tips
- Choose appropriate bit depth for your needs
- Compress repetitive or structured text
- Use high-quality cover images
- Avoid overloading image capacity

## 🔍 Detection and Analysis

### Included Detection Methods
- **Chi-square Test**: Statistical analysis of LSB patterns
- **Histogram Analysis**: Pixel distribution changes
- **Visual Inspection**: Side-by-side comparison tools

### Resistance Techniques
- **Minimal Bit Usage**: 1 bit per channel reduces artifacts
- **Compression**: Reduces pattern recognition
- **Encryption**: Prevents content analysis
- **Random Distribution**: Spreading data across image

## 🐛 Troubleshooting

### Common Issues

1. **"Image too large" Error**
   - Check capacity with `cli.py capacity`
   - Use higher bit depth or compression
   - Split message across multiple images

2. **"Invalid magic bytes" Error**
   - Image may not contain hidden data
   - Check if image was modified after embedding
   - Verify correct bit depth setting

3. **"Invalid password" Error**
   - Ensure correct password entry
   - Check for typos or case sensitivity
   - Verify image contains encrypted data

4. **Poor Image Quality**
   - Reduce bit depth (use 1 bit/channel)
   - Choose better cover image
   - Enable compression to reduce payload size

### Error Codes
- `SteganographyError`: Core library errors
- `ValueError`: Invalid parameters
- `FileNotFoundError`: Missing image files
- `MemoryError`: Image too large for processing

## 📚 Academic Report

For detailed technical analysis, methodology, and results, see the comprehensive academic report: `PROJECT_REPORT.pdf`

The report includes:
- Theoretical background
- Algorithm implementation details
- Experimental methodology
- Comprehensive results analysis
- Security evaluation
- Future research directions

## 🔗 Dependencies

- **Pillow (PIL)**: Image processing
- **PyQt5**: GUI framework
- **pycryptodome**: Encryption algorithms
- **numpy**: Numerical operations
- **matplotlib**: Plotting and visualization
- **scikit-image**: Image quality metrics
- **zstandard**: Advanced compression

## 📜 License

This project is for educational and research purposes. Please use responsibly and in accordance with applicable laws and regulations.

## 🤝 Contributing

This is an academic project. For improvements or bug reports, please:
1. Document the issue clearly
2. Provide test cases
3. Consider security implications
4. Maintain educational focus

## 📧 Contact

For academic inquiries or collaboration opportunities, please refer to the project documentation and academic report.

---

*This steganography application demonstrates advanced concepts in digital forensics, cryptography, and image processing while maintaining a focus on educational value and defensive security awareness.*
"# Steganography-App" 
