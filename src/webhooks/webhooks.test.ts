import { Webhooks } from './webhooks'

describe('Webhooks', () => {
  test('should succeed in verifying the webhook integrity', async () => {
    const webhooks = new Webhooks()

    const verified = webhooks.verify({
      payload: 'this is a test with utf32 char これはテストです',
      publicKey:
        '-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEArBCknsoGmHt5uJG2y30TBCZqDE6eW6Jnpa5XrBj9Kro=\n-----END PUBLIC KEY-----\n',
      signature:
        'eb29829fdd6a01f0e78836c9f63ec4a8bc1647cc2e973ba6a9bb3508aafbbe4d9c1ff54516cc5fb39396a001d23b84fb3bc876895511e1bfafb062812d40eb0b',
      signatureTime: 1660174504702,
    })

    expect(verified).toBeTruthy()
  })

  test('should fail in verifying the webhook integrity', async () => {
    const webhooks = new Webhooks()

    const verified = webhooks.verify({
      payload: 'this is a test with utf32 char これはテストです',
      publicKey:
        '-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEArBCknsoGmHt5uJG2y30TBCZqDE6eW6Jnpa5XrBj9Kro=\n-----END PUBLIC KEY-----\n',
      signature: '',
      signatureTime: 0,
    })

    expect(verified).toBeFalsy()
  })

  test('should fail in verifying the webhook integrity when the public key used does not match the one used for generating the private key', async () => {
    const webhooks = new Webhooks()

    const verified = webhooks.verify({
      payload: 'this is a test with utf32 char これはテストです',
      publicKey:
        '-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEArBCknsaGmHt5uJG2y30TBCZqDE6eW6Jnpa5XrBj9Kro=\n-----END PUBLIC KEY-----\n',
      signature:
        'eb29829fdd6a01f0e78836c9f63ec4a8bc1647cc2e973ba6a9bb3508aafbbe4d9c1ff54516cc5fb39396a001d23b84fb3bc876895511e1bfafb062812d40eb0b',
      signatureTime: 1660174504702,
    })

    expect(verified).toBeFalsy()
  })
})
