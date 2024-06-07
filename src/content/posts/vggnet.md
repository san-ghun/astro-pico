---
title: "[Paper Review] VGGNet"
author: Astro Learner
description: "VGGNet, 'Very Deep Convolutional Networks for Large-Scale Image Recognition' (2014)"
image:
  url: ""
  alt: ""
pubDate: 2018-05-29
tags: ["paper review"]
---

Review: VGGNet은 구조가 간단하며 이해나 변형이 쉬운 장점을 가진다. 하지만 FC로 인해 파라미터의 수가 매우 많다는 단점을 가지며, 이로 인해 필요한 메모리 수가 크고, 학습 시간이 오래 걸린다는 약점을 가진다.

<!--more-->

# VGGNet: Very Deep Convolutional Networks for Large-Scale Image Recognition

- References
  - Simonyan, Karen, and Andrew Zisserman. "Very deep convolutional networks for large-scale image recognition." (2014). [[pdf]](https://arxiv.org/pdf/1409.1556.pdf)

## Abstract

- 주요 연구 목적은 망의 깊이(depth)가 정확도에 미치는 영향력이다.
- 주요 연구 성과는 3x3 convolution filter를 사용한 구조에서 망의 깊이를 증가시켰을 때 보여진 향상된 결과와 그 평가이다. (16~19 레이어)
- ImageNet Challenge 2014에서 localisation 1위, classification 2위 (GoogLeNet이 1위)

## 1. Introduction

- Convolutional networks (ConvNets)가 이미지와 영상 인지에서 큰 성과를 보여줌.
  - 예시 1) ILSVRC2013에서 ZFNet은 첫번째 convolutional layer에서 AlexNet보다 작은 filter(window) size와 stride 사이즈를 적용하여 성능향상. (Zeiler & Fergus, 2013; Sermanet et al., 2014).
  - 예시 2) (Sermanet et al., 2014; Howard, 2014)에서 training과 testing에서의 scale 조정, data augmentation 등이 연구됨.
- 본 연구에서는 3x3 convolution filster를 활용하여 망의 깊이(depth)에 집중함.
- 결과적으로, ImageNet 챌린지뿐 아니라 다른 데이터셋에서도 좋은 성과를 보임.

## 2. ConvNet Configurations

망 구성에 관한 설명.

- 깊이에 의한 향상도를 측정하기 위해 ConvNet layer들이 동일하게 설정됨.

### 2.1. Architecture

- training 중에는, 입력 데이터가 224x224 RGB 이미지로 고정됨.
- 전처리는, 각 pixel에 RGB의 평균값을 빼준다.
- conv. layers에서 3x3 필터를 사용. stride = 1
- Max-pooling 2x2 filter, stride = 2
- 추가적으로 특정 설정에서는 1x1 conv. filter를 적용하여, (ReLU를 통한) 추가적인 non-linearity 확보.
- conv. layers 이후에, 3개의 Fully-Connected(FC) layers를 적용. (각 FC의 출력 채널수: 4096, 4096, 1000)
- 마지막에 soft-max layer 적용.
- 모든 hidden layers에는 ReLU 적용.
- Local Response Normalisation(LRN) normalisation을 미적용 (Krizhevsky et al., 2012). 적용시, 메모리 소모와 연산 시간 소모 증가를 보임.

### 2.2. Configurations

- A부터 E까지 총 6가지 구성으로 나뉜다. ([Table 1] 참고)
  - layers의 수와 1x1 conv. layer의 추가 등에 따라 조금씨 다름.

### 2.3. Discussion

- 이전의 연구들이 상대적으로 큰 필터를 사용한 것에 비해, 본 연구는 3x3의 매우 작은 필터와 stride 1을 적용함.
  - 3x3 필터 2개로 5x5 필터의 효과, 3x3 필터 3개로 7x7 필터의 효과를 보며, 오히려 파라미터는 더 적게 사용됨(비용이 작음). (9+9 < 25, 9+9+9 < 49)
- 1x1 conv. filter를 적용하여, 차원을 유지하며 ReLU를 통한 추가적인 non-linearity 확보.

## 3. Classification Framework

training과 evaluation에 관한 설명.

### 3.1. Training

- optimizer에는, mini-batch gradient descent(SGD)와 momentum(모멘텀) 적용.
  - batch size = 256, momentum = 0.9
- regularisation에는, L2 패널티와 dropout 적용.
  - dropout은 0.5로 1st 2nd FC에 적용.
- learning rate = $$10^{-2}$$, 정확도가 향상되지 않을 경우 학습도가 감소하게 설정.
- Deep net은 학습할 때 vanishing/exploding gradient 문제로 학습이 어려워질 수 있는데, 이것을 먼저 11-layer의 비교적 간단한 구조(A)를 학습시킨 후, 더 깊은 나머지 구조를 학습할 때는 처음 4 layer와 마지막 3개 FC를 구조-A의 학습결과로 초기화 시킨 후 학습을 진행하여 해결하였다.

**Training image size**

- data augmentation기법을 적용함.
- 예시) AlexNet, 학습 이미지를 256x256 크기로 만든 후, 무작위로 224x224 크기의 이미지로 잘라서 취함.
- training scale로 single-scale training과 multi-scaling training 지원.
  - single-scale에서는 256x256 고정과, 256x256과 384x384를 지원하는 두가지 scale 지원.
  - multi-scale에서는 min = 256, max = 512로 하여, 256과 512범위에서 무작위로 scale을 정할 수 있게 함. 384로 미리 학습시킨 후 무작위로 선택하며 fine tuning을 함. scale jittering이라고 함.
- 이후 224x224 크기를 선택하여 취함(AlexNet과 동일).

### 3.2. Testing

- test scale을 사용하여, 테스트 이미지를 적당한 크기로 조절함.
- multi-crop 방식(무작위 선택, 코너 및 센터 등의 이미지를 선택하여 좌우반전 적용)의 테스트 이미지 augmentation을 적용. (150장으로 augmentation).
- 연산량을 줄이기 위해 OverFeat 구조에서 사용한 **dense evaluation** 개념을 적용.  
  위를 위해 참고 [[link]](https://laonple.blog.me/220749876381)

### 3.3. Implementation Details

- 4개의 NVIDIA Titan Black GPU로 하나의 net 구성을 학습시키는데 2-3주 걸림.

## 4. Classification Experiments

**Dataset**

- ILSVRC-2012 dataset을 사용.
  - 1000 class
  - sets: training(1.3M images), validation(50k images), testing(100k images with held-out class labels).
  - evaluating measures: the top-1 and top-5 error.

### 4.1. Single Scale Evaluation

- [Table 3] 참고
- 망이 깊을수록 결과가 좋아지고, 학습에 scale jittering을 적용한 경우에 결과가 더 좋았다.
- B구조에 3x3 conv. layer 2개를 곂쳐서 사용한 경우와 5x5 conv. layer를 1개 사용하는 모델을 만들어 비교함.
  - 3x3 conv. layer 2개인 모델이 결과가 더 좋았다.
  - 망을 깊게 만들고, 파라미터의 크기를 줄이고, 뉴런에 있는 non-linearity 활성함수를 통해 feature 추출 특성이 좋아졌음을 반증함.

### 4.2. Multi-Scale Evaluation

- [Table 4] 참고
- multi-scale test에서 train-scale(S)이 고정된 경우에, {S-32, S, S+32}로 test-scale을 변화시키며 테스트 진행. (train과 test의 scale 차이가 크면 오히려 결과가 좋지 못해서 이와 같이 설정.)
- 학습에 scale jittering을 적용한 경우 출력 크기를 [256, 384,512]로 test 이미지 크기를 정함. 결과는 더 미적용보다 좋았음.
- single scale보다 multi scale이 결과가 더 좋았음.

### 4.3. Multi-Crop Evaluation

- [Table 5] 참고
- multi-crop과 dense evaluation은 각각 적용했을 때와 같이 적용했을 때로 나누어 진행함.
- 함께 진행한 경우, 상보적인 특성을 갖고 있어 성능이 개선되었다고 함.

### 4.4. ConvNet Fusion

- 구조 D와 E에 multi-scale과 multi-crop evaluation, dense evaluation을 적용한 앙상블 구조가 가장 좋은 성과를 보임.

### 4.5. Comparision with the State-of-the-Art

- VGGNet의 위 2개 모델 앙상블이 top-5 val. error와 top-5 test error 6.8%.
- GoogLeNet의 7개 모델 앙상블이 top-5 val. error와 top-5 test error 6.7%.

## 5. Conclusion

- 망의 깊이가 분류의 정확도에 유익한 영향을 미치며, 챌린지를 통해 기존의 ConvNet 구조에서 망의 깊이 증가를 통해 좋은 성능을 보여줄 수 있음을 알 수 있었음.
